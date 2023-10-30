import e from "express";

import { BadRequestException, createParamDecorator } from "@nestjs/common";

export const Namespace = createParamDecorator((_data: void, req: e.Request) => {
  const ns = req.params.namespace || req.query.namespace;
  if (!ns) {
    const message = `Expected namespace to be defined`;
    throw new BadRequestException(message);
  }
  return ns;
});
