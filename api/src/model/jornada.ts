export type Jornada = {
    id: string
    nombre: string
    descripcion: string | null
    horaEntrada: string
    horaSalida: string
    estaDeshabilitado: boolean | null
    diasSemana: string[]
}
