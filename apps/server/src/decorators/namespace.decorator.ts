import e from "express";

import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Namespace = createParamDecorator((_data: void, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<e.Request>();
  const ns = req.params?.namespace || req.query?.namespace;
  if (!ns) {
    const message = `Expected namespace to be defined`;
    throw new BadRequestException(message);
  }
  return ns;
});
