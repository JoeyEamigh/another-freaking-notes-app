import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  private logger = new Logger('LoginGuard');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.authService.validateUser(request.body.email, request.body.password);

    if (!!user) {
      if (user.emailVerified) {
        request.user = await this.authService.readUser(user.id);
        return true;
      } else {
        this.logger.log('Email Not Verified');
        throw new ForbiddenException('Email Not Verified');
      }
    } else {
      this.logger.log('User credentials incorrect');
      throw new UnauthorizedException();
    }
  }
}
