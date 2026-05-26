export type AutorizadoRetiro = {
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    rut: string | null
    genero: string | null
    telefono: string | null
    parentesco: 'papa' | 'mama' | 'familiar' | null
}
