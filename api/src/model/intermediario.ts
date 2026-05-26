export type Intermediario = {
    id: string
    tipo: 'intermediario'
    nombre: string
    contactoNombre: string | null
    contactoEmail: string | null
    estado: 'ACTIVO' | 'INACTIVO'
}
