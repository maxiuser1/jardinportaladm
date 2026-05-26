export type MatricularPostVm = {
    cotizacionId: string;
    formaPago: 'TARJETA' | 'TRANSFERENCIA' | 'EFECTIVO';
    anotaciones: string | null;
    itemsPagados: string[];
    contratoUrl?: string;
}
