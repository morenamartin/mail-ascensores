import { Process, Processor } from "@nestjs/bull"
import type { Job } from "bull";
import { SendEmailDto } from "src/common/dto";
import { createTransporter } from "src/config/nodemailer";
import sanitizeHtml from "sanitize-html";

@Processor("email-queue")
export class EmailProcessor {

    @Process("send-email")
    async handleSendEmail(job: Job<SendEmailDto>) {
        const {mailOptions, smtpConfig} = job.data;

let sanitizedHtml = sanitizeHtml(mailOptions.html, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'h1','h2','h3','h4','h5','h6',
    'p','span','strong','em','u','b','i',
    'ul','ol','li','a','img','div','table','tr','td','th','br','hr',
    'thead','tbody','tfoot','blockquote','pre','code','sub','sup'
  ]),
  allowedAttributes: {
    '*': ['style', 'align', 'bgcolor', 'width', 'height', 'valign'],
    'a': ['href', 'target', 'title'],
    'img': ['src', 'alt', 'width', 'height', 'style'],
    'td': ['colspan', 'rowspan', 'align', 'bgcolor', 'width', 'height', 'valign'],
    'table': ['width', 'border', 'cellspacing', 'cellpadding', 'align', 'bgcolor']
  },
  allowedStyles: {
    '*': {
      'background': [/^#?([a-f\d]{6}|[a-f\d]{3})$/i, /^rgb\(/, /^rgba\(/],
      'background-color': [/^#?([a-f\d]{6}|[a-f\d]{3})$/i, /^rgb\(/, /^rgba\(/],
      'color': [/^#?([a-f\d]{6}|[a-f\d]{3})$/i, /^rgb\(/, /^rgba\(/],
      'font-family': [/^[\w\s,"'-]+$/],
      'font-size': [/^\d+(px|pt|%)$/],
      'font-weight': [/^[1-9]00$/, /^bold$/, /^normal$/],
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      'text-decoration': [/^none$/, /^underline$/, /^line-through$/],
      'margin': [/^\d+(px|%)?(\s+\d+(px|%)?){0,3}$/],
      'padding': [/^\d+(px|%)?(\s+\d+(px|%)?){0,3}$/],
      'border': [/^\d+px\s+(solid|dashed|dotted)\s+#?([a-f\d]{6}|[a-f\d]{3})$/i],
      'border-radius': [/^\d+px(\s+\d+px){0,3}$/],
      'display': [/^block$/, /^inline-block$/, /^inline$/, /^none$/],
      'width': [/^\d+(px|%)$/, /^auto$/],
      'height': [/^\d+(px|%)$/, /^auto$/],
      'line-height': [/^\d+(px|%)?$/, /^\d+(\.\d+)?$/],
      'vertical-align': [/^top$/, /^middle$/, /^bottom$/]
    }
  },
  allowedClasses: {
    "*": ["/.*/"]
  }, 
  disallowedTagsMode: 'discard'
});

        const transporter = createTransporter(smtpConfig)

        try{
            await transporter.sendMail({
                ...mailOptions,
                html: sanitizedHtml
            })
        } catch(error) {
            throw new Error(`Error al enviar el correo desde el Pocessor: ${error}`)
        }
    }
}