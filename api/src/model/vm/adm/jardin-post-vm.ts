export type JardinPostVm = {
    id: string;
    nombreComercial: string;
    razonSocial: string;
    ruc: string;
    correoFacturacion: string;
    responsablePago: string;
    moneda: 'CLP' | 'UF';
    vigenciaCotizacion: number;
    usuarioNombres: string;
    usuarioApellidos: string;
    usuarioCorreo: string;
    usuarioClave: string;
}
