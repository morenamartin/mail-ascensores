import { Injectable } from "@nestjs/common";
import { MailService } from "./modules/mail/mail.service";

@Injectable()
export class AppService {
    constructor(private readonly mailService: MailService) {}

    async sendFormMail(to: string, name: string, email: string, phone: string, empresa: string, consulta: string): Promise<void> {
        await this.mailService.sendMail(
            to,
            "¡Nueva consulta!",
            "./consulta",
            { name, email, phone, empresa, consulta }
        )
    }
}