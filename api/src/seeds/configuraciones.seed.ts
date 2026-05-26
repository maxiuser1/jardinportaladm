import { AjustePrecio } from '../model/configuracion';

export const seedAjustesPrecio: AjustePrecio[] = [
    // DESCUENTOS INABIF
    {
        id: 'desc-reingreso',
        tenant: 'inabif',
        tipo: 'MOTIVO_DESCUENTO',
        nombre: 'Reingreso',
        valorSugerido: 10,
        descripcion: 'Descuento para alumnos que vuelven al jardín después de un periodo fuera.'
    },
    {
        id: 'desc-hermano',
        tenant: 'inabif',
        tipo: 'MOTIVO_DESCUENTO',
        nombre: 'Hermano en el Jardín',
        valorSugerido: 5,
        descripcion: null
    },
    // RECARGOS INABIF
    {
        id: 'rec-intermediario',
        tenant: 'inabif',
        tipo: 'MOTIVO_RECARGO',
        nombre: 'Servicio por Intermediario',
        valorSugerido: 20,
        descripcion: 'Recargo aplicado por gestiones a través de terceros.'
    },
    // San Juan
    {
        id: 'desc-beca-sj',
        tenant: 'sanjuan',
        tipo: 'MOTIVO_DESCUENTO',
        nombre: 'Beca Excelencia',
        valorSugerido: 25,
        descripcion: null
    }
];
