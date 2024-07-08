import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as morgan from 'morgan';

// Constants for Swagger configuration
export const SWAGGER_API_ROOT = 'api/docs';
export const SWAGGER_API_NAME = 'API';
export const SWAGGER_API_DESCRIPTION = 'API Description';
export const SWAGGER_API_CURRENT_VERSION = '1.0';



async function bootstrap() {
  // Create the Nest application
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // Enable CORS with specific configuration
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only your Next.js app's origin
    credentials: true, // If you want to allow cookies to be included in the requests
  });


  // Setup Swagger
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  // Apply global validation pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Start the Nest application
  app.use(morgan('combined'));
  await app.listen(8080, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Bootstrap the NestJS application
bootstrap();
