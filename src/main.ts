import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { formatFieldName } from './common/utils/helper';
import { Request, Response, NextFunction } from 'express';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const reflector = app.get(Reflector);

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  // exclude sensitive data from responses
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformResponseInterceptor(reflector),
  );

  // modify validation pipe to handle errors globally
  // and format error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTOs
      forbidNonWhitelisted: true, // Throw error if extra props are present
      transform: true, // Transform payloads to DTO instances
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = {};
        validationErrors.forEach((error) => {
          if (error.constraints) {
            errors[error.property] = Object.values(error.constraints).map(
              (msg) =>
                msg.replace(error.property, formatFieldName(error.property)),
            );
          }
        });

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors,
        });
      },
    }),
  );

  // Add request logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    if (req.headers.authorization) {
      console.log(
        'Authorization header present:',
        req.headers.authorization.substring(0, 20) + '...',
      );
    } else {
      console.log('No authorization header');
    }
    next();
  });

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
