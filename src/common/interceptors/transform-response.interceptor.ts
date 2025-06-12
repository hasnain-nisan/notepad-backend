import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_MESSAGE_KEY } from '../decorators/api-message.decorator';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<unknown, { message: string; data: T }>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<{ message: string; data: T }> {
    const handler = context.getHandler();
    const message: string =
      this.reflector.get<string>(API_MESSAGE_KEY, handler) ??
      'Request successful';

    return next.handle().pipe(
      map((data): { message: string; data: T } => ({
        message,
        data: data as T,
      })),
    );
  }
}
