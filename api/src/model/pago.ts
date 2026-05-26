import { EntidadBase } from './base';

export type Pago = EntidadBase & {
    tipo: 'pago'
    servicioNinoId: string // Referencia al contrato/servicio del niño
    ninoId: string
    sucursalId: string

    periodo: string 
    montoPagado: number
    moneda: string
    metodoPago: 'TRANSFERENCIA' | 'EFECTIVO' | 'TARJETA' | 'OTRO'
    referencia?: string
    fechaPago: string
}
