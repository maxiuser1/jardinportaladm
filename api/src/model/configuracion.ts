export type AjustePrecioTipo = 'MOTIVO_DESCUENTO' | 'MOTIVO_RECARGO' | 'PARAMETRO_SISTEMA';

export type AjustePrecio = {
    id: string;
    tenant: string;
    tipo: AjustePrecioTipo;
    nombre: string;
    valorSugerido: number | null;
    descripcion: string | null;
};
