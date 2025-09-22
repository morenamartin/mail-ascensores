import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";


class SendEmailDto {
    to: string;
    name: string;
    email: string; 
    phone: string;
    empresa?: string;
    consulta: string;
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("send-email")
    async sendEmail(
        @Body() sendEmailDto: SendEmailDto
    ): Promise<{ message: string }> {
        await this.appService.sendFormMail(sendEmailDto.to, sendEmailDto.name, sendEmailDto.email, sendEmailDto.phone, sendEmailDto.empresa || "Este usuario no tiene empresa", sendEmailDto.consulta,)
        return { message: "Su consulta se envió correctamente" }
    }
    
}