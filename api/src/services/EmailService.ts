import { EmailAddress, EmailAttachment, EmailClient, EmailMessage } from '@azure/communication-email';

export class EmailService {
  async send(correos: string[], subject: string, plantilla: string, pdfAttachment?: Buffer) {
    let emailAddresses: EmailAddress[] = [];
    correos.forEach((correo) => {
      emailAddresses.push({ address: correo, displayName: correo });
    });

    const emailcn = process.env.EMAIL_SERVICE_CS;
    if (!emailcn) throw new Error("Connection string EMAIL_SERVICE_CS is not set");
    
    const emailClient = new EmailClient(emailcn);

    const attachments: EmailAttachment[] = [];
    if (pdfAttachment) {
      attachments.push({
        name: 'Cotizacion.pdf',
        contentType: 'application/pdf',
        contentInBase64: pdfAttachment.toString('base64')
      });
    }

    const message: EmailMessage = {
      senderAddress: 'DoNotReply@9ed6889a-d99d-4545-8d9e-0bc9f5985ee1.azurecomm.net',
      content: {
        subject,
        html: plantilla,
      },
      recipients: {
        to: emailAddresses,
      },
      attachments: attachments.length > 0 ? attachments : undefined
    };

    const poller = await emailClient.beginSend(message);
    await poller.pollUntilDone();
  }
}
