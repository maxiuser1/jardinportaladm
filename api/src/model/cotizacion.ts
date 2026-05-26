import { EntidadBase } from './base';
import { Direccion } from './direccion';

export type Cotizacion = EntidadBase & {
    tipo: 'cotizacion'
    tipoCotizacion: 'familia' | 'empresa' | 'intermediario'
    sucursalId: string
    vendedorId: string
    intermediarioId: string | null
    empresa: {
        ruc: string
        razonSocial: string
    } | null

    // Datos del niño (Desnormalizados para persistencia histórica)
    nino: {
        rut: number | null
        nombres: string
        apellidoPaterno: string
        apellidoMaterno: string
        fechaNacimiento: string
    }

    // Datos del apoderado (Desnormalizados)
    apoderado: {
        rut: number | null,
        nombres: string
        apellidoPaterno: string
        apellidoMaterno: string
        telefono: string
        correo: string
        direccion: Direccion
    }

    // Contexto Logístico seleccionado
    contexto: {
        nivelId: string
        nivelNombre: string
        jornadaId: string
        jornadaNombre: string
        salaId: string | null
        fechaIngreso: string
    }

    // Condiciones comerciales pactadas
    formaPago: 'MENSUAL' | 'ANUAL'
    mesesContratados: number

    // Detalle de cobros (Plan de Pago)
    items: ItemCotizacion[]

    total: number
    moneda: string
    estado: 'PENDIENTE' | 'ENVIADA' | 'ACEPTADA' | 'VENCIDA'
    fechaVencimiento: string
    comoNosConociste: string
}

export type ItemCotizacion = {
    servicioId: string
    nombre: string
    categoria: 'MATRICULA' | 'MENSUALIDAD' | 'ADICIONAL'
    precioBase: number
    descuentoManual: number
    precioFinal: number
    moneda: string
    observacion: string
}
