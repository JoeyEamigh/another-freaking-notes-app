import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import path from 'path';
import { Public } from './auth/auth.decorator';

@Controller()
export class AppController {
  @Get()
  @Public()
  home() {
    return { message: 'Another Freaking Notes App API' };
  }

  @Get('/robots.txt')
  @Public()
  getRobots(@Res() res: Response) {
    res.sendFile(path.join(__dirname, 'assets/robots.txt'));
  }
}
