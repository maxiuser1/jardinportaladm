import { Cotizacion } from '../model/cotizacion';
import { HtmlService } from './HtmlService';
import { PdfService } from './PdfService';
import { EmailService } from './EmailService';

export class CotizacionDocumentoService {
    async generarPdf(cotizacion: Cotizacion): Promise<Buffer> {
        const htmlService = new HtmlService();
        const pdfHtmlData = htmlService.renderTemplate(cotizacion, 'cotizacion/documento/generico/index.html');
        const pdfService = new PdfService();
        return await pdfService.generar(pdfHtmlData);
    }

    async enviarCorreo(cotizacion: Cotizacion): Promise<void> {
        const htmlService = new HtmlService();
        const plantillaHtmlData = htmlService.renderTemplate(cotizacion, 'cotizacion/correo/index.html');
        
        const pdfBuffer = await this.generarPdf(cotizacion);
        
        const emailService = new EmailService();
        const subject = `Cotización Jardín - ${cotizacion.apoderado.nombres}`;
        await emailService.send([cotizacion.apoderado.correo], subject, plantillaHtmlData, pdfBuffer);
    }
}
