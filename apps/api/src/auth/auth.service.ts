import { Injectable } from '@nestjs/common';
import { Prisma, Session, TokenType, User } from 'prismas';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcryptjs';
import { randomString } from './randomString';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async getHangingSession(user: User, fingerprint: string) {
    return await this.prisma.session.findFirst({ where: { User: { id: user.id }, fingerprint } });
  }

  async refresh(user: User, session: Session) {
    const accessVerification = randomString(16);
    const refreshVerification = randomString(16);

    await this.prisma.session.update({
      where: { id: session.id },
      data: { accessVerification, refreshVerification },
    });

    const refreshToken = this.jwtService.sign(
      { id: user.id, verification: refreshVerification, session: session.id },
      { secret: process.env.REFRESH_SECRET, expiresIn: '3650d' },
    );
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        verification: accessVerification,
        session: session.id,
      },
      { secret: process.env.ACCESS_SECRET, expiresIn: '60m' },
    );

    return { accessToken, refreshToken };
  }

  async createTokens(user: User, fingerprint: string) {
    const accessVerification = randomString(16);
    const refreshVerification = randomString(16);

    const session = await this.prisma.session.create({
      data: {
        User: { connect: { id: user.id } },
        accessVerification,
        refreshVerification,
        fingerprint,
      },
    });

    console.log(process.env.REFRESH_SECRET);
    const refreshToken = this.jwtService.sign(
      { id: user.id, verification: refreshVerification, session: session.id },
      { secret: process.env.REFRESH_SECRET, expiresIn: '3650d' },
    );
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        verification: accessVerification,
        session: session.id,
      },
      { secret: process.env.ACCESS_SECRET, expiresIn: '60m' },
    );

    return { accessToken, refreshToken };
  }

  async validateUser(email: string, password: string): Promise<User> {
    email = email.toLowerCase();
    const userStub = await this.prisma.user.findFirst({ where: { email }, select: { password: true } });
    if (!userStub) return null;
    const verified = await bcrypt.compare(password, userStub.password);
    if (!verified) return null;
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async deleteToken(id: string) {
    await this.prisma.token.delete({ where: { id } });
  }

  async getConfirmationToken(userId: string) {
    return await this.prisma.token.findFirst({ where: { userId, type: TokenType.VERIFICATION } });
  }

  async getUserByEmail(email: string) {
    email = email.toLowerCase();
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async getSession(id: string): Promise<Session> {
    return await this.prisma.session.findUnique({ where: { id } });
  }

  async readUser(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Partial<User>) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async createUser(data: Prisma.UserCreateArgs) {
    return await this.prisma.user.create(data);
  }

  async deleteUser(id: string) {
    await this.prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
    return { softDeleted: true };
  }

  async destroyUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { deleted: true };
  }

  async logout(session: Session) {
    await this.prisma.session.delete({ where: { id: session.id } });
  }
}
