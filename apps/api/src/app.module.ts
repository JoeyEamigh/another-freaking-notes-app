import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LogMiddleware } from './logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { environment } from './environment';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    LogMiddleware,
    JwtModule.register({ secret: environment.accessSecret, signOptions: { expiresIn: '60m' } }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
