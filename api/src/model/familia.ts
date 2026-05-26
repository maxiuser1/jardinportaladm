import { EntidadBase } from './base';
import { Apoderado } from './apoderado';
import { AutorizadoRetiro } from './autorizado-retiro';

export type Familia = EntidadBase & {
    apoderados: Apoderado[]
    autorizadosRetiro: AutorizadoRetiro[]
    ninos: Array<{
        id: string
        nombre: string
    }>
}
