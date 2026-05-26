export type JardinItemVm = {
    id: string;
    nombreComercial: string;
    razonSocial: string;
    ruc: string;
    planVigente: string;
    estado: 'ACTIVO' | 'SUSPENDIDO' | 'DEMO';
    creadoEn: string;
}
