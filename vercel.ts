// vercel.ts
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './src/app.module';

let server: ReturnType<typeof createServer> | null = null;

async function bootstrap() {
  const expressApp = express();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  nestApp.enableCors();
  await nestApp.init();

  server = createServer(expressApp);
}

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (!server) {
    await bootstrap();
  }
  // @ts-ignore
  server.emit('request', req, res);
};