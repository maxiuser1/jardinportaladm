import axios from 'axios';

export class PdfService {
    /**
     * Convierte código HTML en un archivo PDF utilizando Gotenberg.
     * @param htmlData El contenido HTML a convertir.
     * @returns Un Buffer con el contenido del PDF generado.
     */
    async generar(htmlData: string): Promise<Buffer> {
        // En Node >= 18, FormData y Blob están disponibles de forma nativa.
        const formData = new FormData();
        
        // Gotenberg requiere estrictamente que el archivo HTML se llame 'index.html'
        const htmlBlob = new Blob([htmlData], { type: 'text/html' });
        formData.append('files', htmlBlob, 'index.html');

        const config = {
            method: 'POST',
            url: 'https://webappc-004-sirius-pdf-dev-qa.azurewebsites.net/forms/chromium/convert/html',
            data: formData,
            // Pedimos a axios que nos devuelva un arraybuffer para poder convertirlo a Buffer
            responseType: 'arraybuffer' as const
        };

        try {
            const response = await axios.request(config);
            return Buffer.from(response.data);
        } catch (error: any) {
            let errorMsg = error?.message;
            if (error?.response?.data) {
                const errData = error.response.data;
                errorMsg = Buffer.isBuffer(errData) ? errData.toString() : errData;
            }
            console.error('Error al generar PDF con Gotenberg:', errorMsg);
            throw new Error('No se pudo generar el documento PDF.');
        }
    }
}