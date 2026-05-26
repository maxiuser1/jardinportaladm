import { Direccion } from "../../../direccion";

export type CotizacionApoderadoVm = {
    rut: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    telefono: string;
    direccion: Direccion
}