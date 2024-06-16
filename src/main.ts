import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogLevel, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from '@utils/http-exception-filter.util';

const bootstrap = async (): Promise<void> => {
  const port = process.env.PORT || 3000;

  // Setup log level
  const logger: LogLevel[] = process.env.LOGLEVEL
    ? (process.env.LOGLEVEL.split(',') as LogLevel[])
    : ['debug', 'log', 'error', 'warn'];

  // Create Nest Factory
  const app = await NestFactory.create(AppModule, { logger });

  // Set Global prefix
  app.setGlobalPrefix('/api');

  // Set versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Set enableCors
  app.enableCors();

  // Set global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Validate DTO class
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Start server
  await app.listen(port);
};

bootstrap();
