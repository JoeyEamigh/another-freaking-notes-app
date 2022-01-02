import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import useragent from 'useragent';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const UserAgent = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const agent = useragent.lookup(request.headers['user-agent']);
  return { browser: agent.toString().split('/')[0], os: agent.os.toString() };
});

export const SessionObj = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.session;
});
