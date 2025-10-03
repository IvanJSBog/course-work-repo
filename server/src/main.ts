import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
    .setTitle('Course work API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Course work API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(cookieParser(configService.getOrThrow<string>('COOKIE_SECRET')));

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  app.enableCors({
    origin: configService.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(configService.getOrThrow('APPLICATION_PORT') ?? 3000);
}
bootstrap();
