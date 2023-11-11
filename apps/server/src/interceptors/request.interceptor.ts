import { pick } from "lodash";
import { Observable, catchError, map } from "rxjs";

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor
} from "@nestjs/common";

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map(data => ({ success: true, data, error: null })),
      catchError(error => {
        throw new HttpException(
          {
            success: false,
            data: null,
            error:
              error instanceof HttpException
                ? error.getResponse()
                : { ...pick(error, ["message"]), status: 500 }
          },
          error.status || 500
        );
      })
    );
  }
}
