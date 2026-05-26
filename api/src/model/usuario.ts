export type Usuario = {
    id: string;
    tenant: string;
    tipo: 'usuario';
    nombres: string;
    apellidos: string;
    sucursalDefectoId?: string;
    sucursales: { id: string; nombre: string }[];
    contacto: {
        correo: string;
    };
    autenticacion: {
        clave: string;
        bloqueado: boolean;
        estado: 'VERIFICADO' | 'NO_VERIFICADO';
        roles: string[];
    };
    estado: 'ACTIVO' | 'DESHABILITADO';
    creadoEn: string;
}
