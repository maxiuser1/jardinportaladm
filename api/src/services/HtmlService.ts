import * as fs from 'fs';
import * as Handlebars from 'handlebars';

Handlebars.registerHelper('monto', function(value) {
    if (value == null) return "0";
    return Number(value).toLocaleString('es-CL');
});

Handlebars.registerHelper('formatearFecha', function(value) {
    if (!value) return "";
    return new Date(value).toLocaleDateString('es-CL');
});

Handlebars.registerHelper('hoyLargo', function(nombre) {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date().toLocaleDateString('es-CL', opciones);
    return `Emitido el ${fecha} por ${nombre || 'JardinPortal'}`;
});

export class HtmlService {
    renderTemplate(payload: any, templateRoute: string): string {
        const hbs = fs.readFileSync(`./src/templates/${templateRoute}`, 'utf-8');
        const handlebars = Handlebars.compile(hbs);
        return handlebars(payload);
    }
}