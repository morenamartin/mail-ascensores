import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class SendEmailDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  empresa?: string;
  
  @IsOptional()
  @IsString()
  domicilio: string;

  @IsString()
  consulta: string;
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("send-email")
    async sendEmail(
        @Body() sendEmailDto: SendEmailDto
    ): Promise<{ message: string }> {
        // console.log('📥 DTO recibido:', sendEmailDto);
        await this.appService.sendFormMail(sendEmailDto.name, sendEmailDto.email, sendEmailDto.phone, sendEmailDto.empresa || "Este usuario no tiene empresa", sendEmailDto.domicilio, sendEmailDto.consulta,)
        return { message: "Su consulta se envió correctamente" }
    }

    // @Post('test')
    //     testBody(@Body() body: SendEmailDto) {
    //     console.log('🔍 Cuerpo crudo:', body);
    //     return { received: body };
    // }
    
}