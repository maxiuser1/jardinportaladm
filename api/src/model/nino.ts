import { EntidadBase } from './base';

export type Nino = EntidadBase & {
    familiaId: string

    rut: number | null
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    fechaNacimiento: string
    genero: string

    estado: 'activo' | 'retirado'
    sucursalActualId?: string
    nivelActualId?: string
    jornadaActualId?: string
    estadoPago?: 'al_dia' | 'atrasado'
    
    // Datos complementarios
    antecedentesMedicos?: string
    alergias?: string
    vacunas?: string
}
