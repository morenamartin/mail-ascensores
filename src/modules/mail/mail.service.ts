import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import type { Queue } from "bull";
import { SendEmailDto } from "src/common/dto";

@Injectable({})
export class MailService {

    constructor(
        @InjectQueue("email-queue") private readonly emailQueue: Queue
    ){}

    async sendMail(email) {
        const {smtpConfig, mailOptions} = email

        try {
            await this.emailQueue.add("send-email", {
                smtpConfig,
                mailOptions
            }, {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 5000
                }
            })
            return { message: "Correo enviado correctamente" }
        } catch (error) {
            throw new Error("Hubo un error al crear el proceso" + error.message)
        }
    }
}