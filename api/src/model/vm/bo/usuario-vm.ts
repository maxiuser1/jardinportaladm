export type UsuarioVm = {
    id: string;
    nombres: string;
    apellidos: string;
    correo: string;
    roles: string[];
    sucursalDefectoId: string | null;
    tenant: {
        id: string;
        nombre: string;
        logo: string | null;
        moneda: 'CLP' | 'UF';
        colores: {
            primary: string;
            secondary: string;
            accent: string;
        } | null;
    };
    sucursales: { id: string; nombre: string }[];
}
