// import 'dotenv/cofig';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const { PORT } = process.env;
// const PORT = 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT || 8080);
  Logger.log(
    `\n.....\n....\n...\n..\n.\n> Server is up and running on ${PORT || 8080}`,
    'Bootstrap',
  );
}
bootstrap();
