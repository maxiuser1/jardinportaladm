import { CotizacionListaItemVm } from "./cotizacion-lista-item-vm";

export type CotizacionListaVm = {
    items: CotizacionListaItemVm[];
    total: number;
    limit: number;
    offset: number;
};
