# 📧 Mail Service – Ascensores MG

[![NestJS](https://img.shields.io/badge/NestJS-11-FF0000?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![EmailJS](https://img.shields.io/badge/EmailJS-5-000000?logo=maildotru&logoColor=white)](https://www.emailjs.com/)
[![License](https://img.shields.io/badge/License-UNLICENSED-red)](LICENSE)

Microservicio backend desarrollado en **NestJS** para el envío seguro y confiable de formularios de contacto desde el sitio web de **[Ascensores MG SRCL](https://github.com/morenamartin/AscensoresMG)**.

Este servicio recibe datos de clientes potenciales (nombre, email, teléfono, empresa y consulta) y los envía directamente al equipo de Ascensores MG mediante **EmailJS**, con validación, sanitización y manejo de errores robusto.

---

## 🌐 Integración

Este backend está diseñado para ser consumido exclusivamente por el frontend de [AscensoresMG](https://github.com/morenamartin/AscensoresMG) mediante una llamada API POST.  
✅ **No expone endpoints públicos innecesarios**  
✅ **Sanitiza entradas para prevenir XSS**  
✅ **Valida datos con Zod y class-validator**

---

## 🛠️ Características técnicas

- **Framework**: [NestJS 11](https://docs.nestjs.com/)
- **Envío de emails**: [EmailJS (Node.js SDK)](https://www.emailjs.com/docs/sdk/nodejs/)
- **Validación**: `Zod` + `class-validator`
- **Sanitización**: `sanitize-html` + `validator`
- **Internacionalización de teléfonos**: `libphonenumber-js`
- **Plantillas de email**: Soporte para Handlebars (aunque actualmente se usa EmailJS)
- **Gestión de entorno**: `@nestjs/config` + `.env`
- **Testing**: Jest + Supertest (con cobertura)
- **Linting & Formatting**: ESLint + Prettier

> 💡 Aunque el módulo `MailerModule` con Handlebars está configurado, actualmente el envío se realiza mediante **EmailJS** por simplicidad y seguridad (sin necesidad de gestionar SMTP directamente).
