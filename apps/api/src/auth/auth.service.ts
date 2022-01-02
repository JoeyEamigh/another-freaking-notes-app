import { Injectable } from '@nestjs/common';
import { Session, User } from 'prismas';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getSession(id: string): Promise<Session> {
    return await this.prisma.session.findUnique({ where: { id } });
  }

  async readUser(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Partial<User>) {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async createUser(data: User) {
    return await this.prisma.user.create({ data });
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
