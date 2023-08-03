import { BaseService } from "./base.service";

export class BaseController {
  constructor(private readonly __baseService: BaseService) {}
}
