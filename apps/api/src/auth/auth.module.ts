import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { MailModule } from '../mail/mail.module';

@Global()
@Module({
  imports: [
    JwtModule.register({ secret: process.env.ACCESS_SECRET, signOptions: { expiresIn: '60m' } }),
    RateLimiterModule.register({ keyPrefix: 'auth', points: 5, duration: 60 }),
    MailModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
