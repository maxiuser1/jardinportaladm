import { Nivel } from '../../../nivel';
import { Jornada } from '../../../jornada';
import { Sala } from '../../../sala';
import { Servicio } from '../../../servicio';
import { Direccion } from '../../../direccion';

export type SucursalPostVm = {
    id: string | null;
    nombre: string;
    direccion: Direccion | null;
    niveles: Nivel[];
    jornadas: Jornada[];
    salas: Sala[];
    servicios: Servicio[];
}
