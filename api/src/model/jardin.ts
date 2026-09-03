import { Intermediario } from './intermediario';

export type Jardin = {
    id: string
    creado: string
    actualizado: string | null
    tipo: 'jardin'
    nombreComercial: string
    razonSocial: string
    ruc: string
    correoFacturacion: string
    responsablePago: string
    planVigente: string
    fechaInicioPlan: string
    fechaFinPlan: string
    estado: 'ACTIVO' | 'SUSPENDIDO' | 'DEMO'
    moneda: 'CLP' | 'UF'
    codigoAutorizacionDescuento: string | null
    intermediarios: Intermediario[]
    estilos?: {
        rutaLogo: string;
        primary: string;
        secondary: string;
        accent: string;
    }
    vigenciaCotizacion: number
    periodo: {
        desde: string
        hasta: string
    }
}

