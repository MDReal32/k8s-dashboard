import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";
import { pick } from "lodash";

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({ success: true, data, error: null })),
      catchError(async error => ({
        success: false,
        data: null,
        error:
          error instanceof HttpException
            ? error.getResponse()
            : { ...pick(error, ["message"]), status: 500 }
      }))
    );
  }
}
