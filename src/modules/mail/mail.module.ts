import { Module } from "@nestjs/common";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";
import { BullModule } from "@nestjs/bull";
import { envs } from "src/config";
import { EmailProcessor } from "./mail.processor";

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: envs.redisHost,
                port: envs.redisPort,
                password: envs.redisPassword || undefined,
            },
        }),
        BullModule.registerQueue({
            name: "email-queue",
        }),
    ],
    controllers: [MailController],
    providers: [MailService, EmailProcessor]
})

export class MailModule{}