import { Nivel } from '../../../nivel';
import { Jornada } from '../../../jornada';
import { Sala } from '../../../sala';
import { Servicio } from '../../../servicio';

export type SucursalVm = {
    id: string
    nombre: string
    niveles: Nivel[]
    jornadas: Jornada[]
    salas: Sala[]
    servicios: Servicio[]
}
