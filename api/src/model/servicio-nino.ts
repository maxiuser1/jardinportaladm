import { EntidadBase } from './base';

export type ServicioNino = EntidadBase & {
    tipo: 'servicio_nino'
    ninoId: string
    sucursalId: string
    cotizacionId?: string
    
    servicioId: string
    nombre: string
    categoria: 'MATRICULA' | 'MENSUALIDAD' | 'ADICIONAL'
    
    // Vigencia del servicio para el niño
    fechaInicio: string
    fechaFin: string | null
    
    // Condiciones económicas pactadas
    precioBase: number
    descuentoManual: number
    precioFinal: number
    moneda: string
    
    estado: 'ACTIVO' | 'CANCELADO' | 'FINALIZADO'
    
    // Plan de Pagos (proyección de lo que debe pagar)
    planPagos: CuotaPago[]
    contratoUrl?: string
}

export type CuotaPago = {
    id: string
    periodo: string // Ej: "2026-03"
    monto: number
    moneda: string
    fechaVencimiento: string
    estado: 'PENDIENTE' | 'PAGADO' | 'ATRASADO' | 'ANULADO'
    pagoId?: string // Referencia al documento en el contenedor 'pagos' cuando se liquide
}
