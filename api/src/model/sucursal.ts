import { EntidadBase } from './base';
import { Nivel } from './nivel';
import { Jornada } from './jornada';
import { Sala } from './sala';
import { Servicio } from './servicio';
import { Direccion } from './direccion';

export type Sucursal = EntidadBase & {
    tipo: 'sucursal'
    nombre: string
    direccion: Direccion | null
    niveles: Nivel[]
    jornadas: Jornada[]
    salas: Sala[]
    servicios: Servicio[]
}
