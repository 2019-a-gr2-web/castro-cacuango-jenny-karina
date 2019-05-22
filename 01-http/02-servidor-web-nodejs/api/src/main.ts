import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';
import * as path from "path";
import * as favicon from "serve-favicon"

const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory
      .create(AppModule) as NestExpressApplication;
  app.use(favicon(path.join(__dirname, '..', 'publico', 'imagenes', 'logo epn.ico')));

      app.use(cookieParser('Secreto'));

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //el directorio que usa es el que se llama vista
    app.use(express.static ('publico'));

  await app.listen(3001);
}
bootstrap();
