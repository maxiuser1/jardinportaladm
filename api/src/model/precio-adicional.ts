export type PrecioAdicional = {
    id: string
    tenant: string
    servicioId: string
    servicioNombre: string
    servicioCategoria: 'ADICIONAL'
    sucursalId: string
    valor: number
    moneda: string
    fechaInicioVigencia: string
    fechaFinVigencia: string
}
