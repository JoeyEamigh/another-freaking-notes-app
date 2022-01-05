import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly config: ConfigService,
  ) {}
  private logger = new Logger('AuthGuard');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    } else {
      return this.validateUser(context);
    }
  }

  async validateUser(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.replace('Bearer ', '');

    try {
      const decoded: { id: string; verification: string; session: string } = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('ACCESS_SECRET'),
      });

      const session = await this.authService.getSession(decoded.session);

      request.session = session;

      if (session.accessVerification === decoded.verification) {
        const user = await this.authService.readUser(decoded.id);
        this.logger.log(`user with email ${user.email} verified`);

        request.user = user;
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      // console.log(e);
      throw new UnauthorizedException();
    }
  }
}
