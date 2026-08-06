export type JardinPostVm = {
    id: string;
    nombreComercial: string;
    nombreSucursal: string;
    razonSocial: string;
    ruc: string;
    correoFacturacion: string;
    responsablePago: string;
    moneda: 'CLP' | 'UF';
    vigenciaCotizacion: number;
    periodo: {
        desde: string;
        hasta: string;
    };
    usuarioNombres: string;
    usuarioApellidos: string;
    usuarioCorreo: string;
    usuarioClave: string;
    estilos: {
        rutaLogo: string;
        primary: string;
        secondary: string;
        accent: string;
    } | null;
}
