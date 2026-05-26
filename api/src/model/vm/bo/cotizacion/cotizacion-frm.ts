import { ApoderadoFrm } from './apoderado-frm';
import { NinoFrm } from './nino-frm';

export type CotizacionFrm = {
    apoderado: ApoderadoFrm;
    nino: NinoFrm;
    tipoCotizacion: 'familia' | 'empresa' | 'intermediario';
    fechaIngreso: string;
    tieneIntermediario: boolean;
    intermediarioId: string;
    empresa: { ruc: string; razonSocial: string } | null;
    nivelId: string;
    nivelNombre: string;
    jornadaId: string;
    jornadaNombre: string;
    condicionPago: 'MENSUAL' | 'ANUAL' | '';
}

