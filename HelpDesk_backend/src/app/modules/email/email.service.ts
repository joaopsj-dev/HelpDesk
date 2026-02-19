import { Inject, Injectable } from '@nestjs/common';
import { EmailProvider } from './contracts/email-provider.interface';
import { SendEmailDTO } from './dtos/send-email.dto';
import { EMAIL_PROVIDER } from './email.constants';

@Injectable()
export class EmailService {
  constructor(
    @Inject(EMAIL_PROVIDER)
    private provider: EmailProvider,
  ) {}

  async send(data: SendEmailDTO): Promise<void> {
    await this.provider.send(data);
  }

  async sendWelcomeEmail(to: string, name: string) {
    await this.provider.send({
      to,
      subject: 'Bem-vindo ao HelpDesk 🚀',
      html: `<h1>Olá, ${name}!</h1><p>Sua conta foi criada com sucesso.</p>`,
      text: `Olá, ${name}! Sua conta foi criada com sucesso.`,
    });
  }
}
