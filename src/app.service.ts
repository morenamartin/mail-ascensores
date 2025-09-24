// app.service.ts
import { Injectable } from '@nestjs/common';
import emailjs from '@emailjs/nodejs';

@Injectable()
export class AppService {
  async sendFormMail(
    name: string,
    email: string,
    phone: string,
    empresa: string,
    consulta: string,
  ): Promise<void> {
    console.log('📨 Datos que se envían a EmailJS:', {
      from_name: name,
      from_email: email,
      phone,
      empresa,
      consulta,
    });
    try {
      await emailjs.send(
        
        process.env.EMAILJS_SERVICE_ID,   // Ej: "service_xyz123"
        process.env.EMAILJS_TEMPLATE_ID,  // Ej: "template_abc456"
        {  
          from_name: name,
          from_email: email,
          phone,
          empresa,
          consulta,
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          privateKey: process.env.EMAILJS_PRIVATE_KEY,
        },
      );
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw new Error('No se pudo enviar el correo');
    }
  }
}