import { Apoderado } from '../apoderado';

export type ApoderadoBuscadoVm = {
    familiaId: string
    apoderado: Apoderado
    ninos: Array<{
        id: string
        nombre: string
    }>
}
