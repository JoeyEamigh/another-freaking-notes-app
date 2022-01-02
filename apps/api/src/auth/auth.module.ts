import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environment';

@Module({
  imports: [JwtModule.register({ secret: environment.accessSecret })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
