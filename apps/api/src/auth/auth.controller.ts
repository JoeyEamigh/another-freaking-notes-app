import { BadRequestException, Body, Controller, Get, Logger, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, UserDecorator } from './auth.decorator';
import { UserRegistration } from 'dto';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { Prisma, TokenType, User } from 'prismas';
import { Response } from 'express';
import CryptoJS from 'crypto-js';
import { MailService } from '../mail/mail.service';
import { LoginGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private mailService: MailService) {}
  private readonly logger = new Logger('Auth');

  @Get('me')
  async getMe(@UserDecorator() user: User) {
    return user;
  }

  @UseGuards(RateLimiterGuard)
  @Post('/register')
  @Public()
  async createAccount(@Body() data: UserRegistration) {
    const existingUser = await this.authService.getUserByEmail(data.email);
    if (existingUser) throw new BadRequestException('User already exists');
    const token = CryptoJS.lib.WordArray.random(16).toString();
    const user: Prisma.UserCreateArgs = {
      data: {
        ...data,
        tokens: {
          create: [{ token, type: TokenType.VERIFICATION }],
        },
      },
    };
    await this.authService.createUser(user);
    await this.mailService.sendUserConfirmation(data.email, token);
  }

  @UseGuards(RateLimiterGuard, LoginGuard)
  @Post('/login')
  @Public()
  async login(@UserDecorator() user: User, @Body('fingerprint') fingerprint: string) {
    this.logger.log(`Logging in user: ${user.email}`);
    let tokens: { accessToken: string; refreshToken: string };

    const matchingSession = await this.authService.getHangingSession(user, fingerprint);
    if (matchingSession) {
      this.logger.log(`Found matching session: ${matchingSession.id}`);
      tokens = await this.authService.refresh(user, matchingSession);
    } else {
      tokens = await this.authService.createTokens(user, fingerprint);
    }

    return { user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
  }

  @Get('/confirm')
  @Public()
  async confirmEmail(@Query('user') email: User['email'], @Query('token') token: string, @Res() res: Response) {
    const user = await this.authService.getUserByEmail(email);
    const confirmationToken = await this.authService.getConfirmationToken(user.id);
    if (!user) return res.redirect(`${process.env.FRONTEND_URL}`);
    if (confirmationToken.token !== token) return res.redirect(`${process.env.FRONTEND_URL}`);
    await this.authService.updateUser(user.id, { emailVerified: true });
    await this.authService.deleteToken(confirmationToken.id);
    return res.redirect(`${process.env.FRONTEND_URL}`);
  }
}
