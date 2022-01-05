import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import path from 'path/posix';
import { SES, SendRawEmailCommand } from '@aws-sdk/client-ses';

const ses = new SES({
  apiVersion: '2010-12-01',
  region: process.env.AWS_REGION,
});

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        SES: { ses, aws: { SendRawEmailCommand } },
        sendingRate: 14,
      },
      defaults: {
        from: '"AFNA" <account@anotherfreakingnotes.app>',
      },
      template: {
        dir: path.join(__dirname, '../assets/emails'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
