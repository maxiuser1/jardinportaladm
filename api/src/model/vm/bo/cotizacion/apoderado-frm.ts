import { DireccionFrm } from './direccion-frm';

export type ApoderadoFrm = {
    rut: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    telefono: string;
    extra: string;
    direccion: DireccionFrm;
}
