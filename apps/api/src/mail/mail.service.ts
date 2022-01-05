import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}
  private readonly logger = new Logger('Mail');

  async sendUserConfirmation(email: string, token: string) {
    this.logger.log(`Sending user confirmation email to ${email}`);
    const url = `${process.env.API_URL}/auth/confirm?user=${email}&token=${token}`;

    await this.mailer.sendMail({
      to: email,
      subject: 'Confirm your Email | AFNA',
      template: join(__dirname, './assets/emails/confirmation.hbs'),
      context: { url, email },
    });
  }
}
