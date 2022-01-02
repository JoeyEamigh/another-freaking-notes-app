import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;
    const ip = request.ip;

    this.logger.log(`REQ: ${method} ${originalUrl} - ${ip}`);

    response.on('finish', () => {
      const { statusCode } = response;
      const successRegex = /^[1-3]\d\d$/;

      if (successRegex.test(String(statusCode)))
        this.logger.log(`RESP: ${method} ${originalUrl} ${statusCode} - ${ip}`);
      else this.logger.warn(`RESP: ${method} ${originalUrl} ${statusCode} - ${ip}`);
    });

    next();
  }
}
