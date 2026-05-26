import { SucursalVm } from './sucursal-vm';
import { Precio } from '../../../precio';
import { PrecioAdicional } from '../../../precio-adicional';
import { AjustePrecio } from '../../../configuracion';

export type CotizarDataVm = {
    sucursal: SucursalVm
    preciosCore: Precio[]
    preciosAdicionales: PrecioAdicional[]
    descuentos: AjustePrecio[]
    recargos: AjustePrecio[]
}
