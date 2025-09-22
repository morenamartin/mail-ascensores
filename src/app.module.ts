import { Module } from '@nestjs/common';
import { MailModule } from './modules/mail/mail.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}) ,MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
