import { Test, TestingModule } from '@nestjs/testing';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthController } from '../auth.controller';
import { AuthModule } from '../auth.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, PrismaModule, RateLimiterModule],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
