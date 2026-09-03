import { Intermediario } from '../../intermediario';

export type JardinDetalleVm = {
    id: string;
    creado: string;
    actualizado: string | null;
    nombreComercial: string;
    razonSocial: string;
    ruc: string;
    correoFacturacion: string;
    responsablePago: string;
    planVigente: string;
    fechaInicioPlan: string;
    fechaFinPlan: string;
    estado: 'ACTIVO' | 'SUSPENDIDO' | 'DEMO';
    moneda: 'CLP' | 'UF';
    intermediarios: Intermediario[];
    estilos: {
        rutaLogo: string;
        primary: string;
        secondary: string;
        accent: string;
    } | null;
    vigenciaCotizacion: number;
    periodo: {
        desde: string;
        hasta: string;
    };
    codigoAutorizacionDescuento: string | null;
}
