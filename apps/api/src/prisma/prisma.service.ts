import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from 'prismas';
import bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly config: ConfigService) {
    super(
      config.get('ENV') !== 'production'
        ? {
            log: ['query', 'info', 'warn', 'error'],
          }
        : null,
    );
  }
  private readonly logger = new Logger('Prisma');

  async onModuleInit() {
    await this.$connect();

    // middleware function bc idk params
    // this.$use(async (params, next) => {
    //   console.log('params', JSON.stringify(params));
    //   return next(params);
    // });

    // Middleware function to delete password unless explicitly queried
    this.$use(async (params, next) => {
      const results = await next(params);
      if (results?.deletedAt === null) delete results.deletedAt;
      if (!!results && params.model === 'User') {
        if (params.action === 'findUnique' || params.action === 'findMany' || params.action === 'findFirst') {
          if (params.args?.['select']?.['password'] !== true) {
            delete results.password;
          }
        }
      }
      return results;
    });

    this.$use(async (params, next) => {
      if (params.model === 'Session') return next(params);
      if (params.action === 'findUnique') {
        params.action = 'findFirst';
        params.args.where['deletedAt'] = { equals: null };
      }
      if (params.action === 'findFirst') {
        params.args.where['deletedAt'] = { equals: null };
      }
      if (params.action == 'findMany') {
        if (params.args.where) {
          if (!params.args.where.deletedAt) {
            params.args.where['deletedAt'] = { equals: null };
          }
        } else {
          params.args['where'] = { deletedAt: { equals: null } };
        }
      }
      return next(params);
    });

    this.$use(async (params, next) => {
      if (params.action === 'updateMany') {
        if (params.args.where !== undefined) {
          params.args.where['deletedAt'] = { equals: null };
        } else {
          params.args['where'] = { deletedAt: { equals: null } };
        }
      }
      return next(params);
    });

    // Middleware function to hash password and lowercase email
    this.$use(async (params, next) => {
      if (params.model === 'User' && (params.action === 'create' || params.action === 'update')) {
        const user: User = params.args.data;
        if (!user.password) return next(params);
        const bcryptRegex = /^\$2[ayb]\$.{56}$/;
        if (!bcryptRegex.test(user.password)) {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
          params.args.data = user;
        }
        if (user.email) user.email = user.email.toLowerCase();
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
