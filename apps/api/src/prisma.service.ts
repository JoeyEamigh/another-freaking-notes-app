import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prismas';
import bcrypt from 'bcryptjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Prisma');
  async onModuleInit() {
    await this.$connect();

    // middleware function bc idk params
    this.$use(async (params, next) => {
      console.log(JSON.stringify(params));
      return next(params);
    });

    // Middleware function to hide password unless explicitly queried
    this.$use(async (params, next) => {
      if (params.model === 'User') {
        if (params.action === 'findUnique' || params.action === 'findMany' || params.action === 'findFirst') {
          if (!params.args['select']) {
            params.args['select'] = { password: false };
          } else if (params.args['select']) {
            params.args['select'] = {
              ...params.args['select'],
              password: params.args['select'].password || false,
            };
          }

          return next(params);
        }
      }
    });

    this.$use(async (params, next) => {
      if (params.action == 'findUnique') {
        // Change to findFirst - you cannot filter
        // by anything except ID / unique with findUnique
        params.action = 'findFirst';
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where['deleted'] = false;
      }
      if (params.action == 'findMany') {
        // Find many queries
        if (params.args.where != undefined) {
          if (params.args.where.deleted == undefined) {
            // Exclude deleted records if they have not been explicitly requested
            params.args.where['deleted'] = false;
          }
        } else {
          params.args['where'] = { deleted: false };
        }
      }
      return next(params);
    });

    this.$use(async (params, next) => {
      if (params.action == 'update') {
        // Change to updateMany - you cannot filter
        // by anything except ID / unique with findUnique
        params.action = 'updateMany';
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where['deleted'] = false;
      }
      if (params.action == 'updateMany') {
        if (params.args.where != undefined) {
          params.args.where['deleted'] = false;
        } else {
          params.args['where'] = { deleted: false };
        }
      }
      return next(params);
    });

    // Middleware function to handle softdeletes
    // this.$use(async (params, next) => {
    //   if (params.action === 'delete') {
    //     params.action = 'update';
    //     params.args['data'] = { deletedAt: new Date() };
    //   }

    //   if (params.action == 'deleteMany') {
    //     params.action = 'updateMany';
    //     if (params.args.data != undefined) {
    //       params.args.data['deletedAt'] = new Date();
    //     } else {
    //       params.args['data'] = { deletedAt: new Date() };
    //     }
    //   }
    //   return next(params);
    // });

    // Middleware function to hash password if it's not hashed
    this.$use(async (params, next) => {
      if (params.model === 'User' && (params.action === 'create' || params.action === 'update')) {
        const user = params.args.data;
        const bcryptRegex = /^\$2[ayb]\$.{56}$/;
        if (!bcryptRegex.test(user.password)) {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
          params.args.data = user;
        }
      }
      return next(params);
    });

    // Middleware function to log the action
    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      this.logger.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
