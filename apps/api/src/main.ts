import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  process.env.TZ = 'UTC';
  const appLogger = new Logger('App');

  const app = await NestFactory.create(AppModule);
  const port = 3001;
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  app.enableCors();
  app.use(helmet());

  await app.listen(port);
  appLogger.log(`⭐⭐⭐ Server started on port ${port} ⭐⭐⭐`);
}
bootstrap();
