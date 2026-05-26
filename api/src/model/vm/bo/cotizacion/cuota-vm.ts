export type CuotaVm = {
    id: string;
    nombre: string;
    montoBase: number;
    descuentoPorcentaje: number;
    motivoDescuentoId: string | null;
    motivoNombre: string | null;
    ajusteTipo: string | null;
    total: number;
    moneda: string;
    tipo: 'MATRICULA' | 'MENSUALIDAD';
};
