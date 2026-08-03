export type JardinPatchVm = {
    nombreComercial?: string;
    razonSocial?: string;
    ruc?: string;
    correoFacturacion?: string;
    responsablePago?: string;
    moneda?: 'CLP' | 'UF';
    vigenciaCotizacion?: number;
    periodo?: {
        desde: string;
        hasta: string;
    };
}
