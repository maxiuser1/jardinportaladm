import { Direccion } from './direccion'

export type Apoderado = {
    id: string
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    rut: number | null
    telefono: string | null
    correo: string | null
    esPrincipal: boolean
    direccion: Direccion | null
}
