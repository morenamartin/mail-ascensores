import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { MailService } from "./mail.service";


@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>("MAIL_HOST"),
                    port: 587,
                    secure: false,
                    auth: {
                        user: configService.get<string>("MAIL_USER"),
                        pass: configService.get<string>("MAIL_PASS"),
                    },
                },
                defaults: {
                    from: `"${configService.get<string>("MAIL_FROM")}" <${configService.get<string>("MAIL_USER")}>`,
                },
                template: {
                    dir: join(__dirname, "templates"),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [],
    providers: [MailService],
    exports: [MailService]
})

export class MailModule{}