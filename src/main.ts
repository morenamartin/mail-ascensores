import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api", {
    exclude: [{
      path: "/",
      method: RequestMethod.GET
    }]
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.enableCors({
    origin: "http://localhost:3001", // o "*"
    methods: "GET,POST,PUT,DELETE",
  });

  await app.listen(envs.port);
}
bootstrap();
