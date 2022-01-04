import nodemailer from 'nodemailer';
import HandleBarsMailTemplate from '@config/mail/HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class EtherealMail {
  static async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Sales',
        address: from?.email || 'sac@apisales.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMail;
