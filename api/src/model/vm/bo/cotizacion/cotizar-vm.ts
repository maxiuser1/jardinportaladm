import { CuotaVm } from "./cuota-vm";
import { CotizacionApoderadoVm } from "./cotizacion-apoderado.vm";
import { CotizacionNinoVm } from "./cotizacion-nino-vm";

export type CotizarVm = {
    apoderado: CotizacionApoderadoVm
    nino: CotizacionNinoVm,
    familiaId: string | null
    tipoCotizacion: 'familia' | 'empresa' | 'intermediario'
    fechaIngreso: string
    intermediarioId: string | null
    empresa: { ruc: string; razonSocial: string } | null
    sucursalId: string
    nivelId: string
    nivelNombre: string
    jornadaId: string
    jornadaNombre: string
    salaId: string | null
    formaPago: 'MENSUAL' | 'ANUAL'
    mesesContratados: number
    items: CuotaVm[]
    total: number
    moneda: string
    comoNosConociste: string | null
}
