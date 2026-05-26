import { Apoderado } from "../../apoderado"
import { AutorizadoRetiro } from "../../autorizado-retiro"

export type NinoFichaUpdateVm = {
    // Datos Niño
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    fechaNacimiento: string
    genero: string
    antecedentesMedicos: string
    alergias: string
    vacunas: string

    // Datos Familia
    apoderados: Apoderado[]
    autorizadosRetiro: AutorizadoRetiro[]
}
