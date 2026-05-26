import { Usuario } from '../model/usuario';

export const seedUsuarios: Usuario[] = [
    {
        id: "usr-sup-inabif",
        tenant: "inabif",
        tipo: 'usuario',
        nombres: "Supervisor",
        apellidos: "Inabif",
        sucursalDefectoId: "brillantes",
        sucursales: [{ id: "brillantes", nombre: "Brillantes" }, { id: "diamantes", nombre: "Diamantes" }],
        contacto: { correo: "supervisor@inabif.gob.pe" },
        autenticacion: { clave: "123456", bloqueado: false, estado: "VERIFICADO", roles: ["supervisor", "ejecutivo"] },
        estado: "ACTIVO",
        creadoEn: new Date().toISOString()
    },
    {
        id: "usr-eje-inabif",
        tenant: "inabif",
        tipo: 'usuario',
        nombres: "Ejecutivo",
        apellidos: "Inabif",
        sucursalDefectoId: "brillantes",
        sucursales: [{ id: "brillantes", nombre: "Brillantes" }],
        contacto: { correo: "ejecutivo@inabif.gob.pe" },
        autenticacion: { clave: "123456", bloqueado: false, estado: "VERIFICADO", roles: ["ejecutivo"] },
        estado: "ACTIVO",
        creadoEn: new Date().toISOString()
    },
    {
        id: "usr-sup-sanjuan",
        tenant: "sanjuan",
        tipo: 'usuario',
        nombres: "Supervisor",
        apellidos: "San Juan",
        sucursalDefectoId: "principal",
        sucursales: [{ id: "principal", nombre: "Sede Principal San Juan" }],
        contacto: { correo: "supervisor@sanjuan.com" },
        autenticacion: { clave: "123456", bloqueado: false, estado: "VERIFICADO", roles: ["supervisor", "ejecutivo"] },
        estado: "ACTIVO",
        creadoEn: new Date().toISOString()
    },
    // Super Admins
    {
        id: "usr-adm-ignacio",
        tenant: "admin",
        tipo: 'usuario',
        nombres: "Ignacio",
        apellidos: "G. Jadur",
        sucursales: [],
        contacto: { correo: "i.gon.jadur@gmail.com" },
        autenticacion: { clave: "admin123", bloqueado: false, estado: "VERIFICADO", roles: ["SAAS_ADMIN"] },
        estado: "ACTIVO",
        creadoEn: new Date().toISOString()
    },
    {
        id: "usr-adm-claudio",
        tenant: "admin",
        tipo: 'usuario',
        nombres: "Claudio",
        apellidos: "Aguilera",
        sucursales: [],
        contacto: { correo: "claguilerag@gmail.com" },
        autenticacion: { clave: "admin123", bloqueado: false, estado: "VERIFICADO", roles: ["SAAS_ADMIN"] },
        estado: "ACTIVO",
        creadoEn: new Date().toISOString()
    },
    {
        id: "usr-adm-jose",
        tenant: "admin",
        tipo: 'usuario',
        nombres: "Jose",
        apellidos: "Zeta",
        sucursales: [],
        contacto: { correo: "josezeta18@gmail.com" },
        autenticacion: { clave: "admin123", bloqueado: false, estado: "VERIFICADO", roles: ["SAAS_ADMIN"] },
        estado: "ACTIVO",
        creadoEn: new Date().toISOString()
    },
    {
        id: "usr-adm-edersy",
        tenant: "admin",
        tipo: 'usuario',
        nombres: "Edersy",
        apellidos: "Cedersy",
        sucursales: [],
        contacto: { correo: "lcedersy@gmail.com" },
        autenticacion: { clave: "admin123", bloqueado: false, estado: "VERIFICADO", roles: ["SAAS_ADMIN"] },
        estado: "ACTIVO",
        creadoEn: new Date().toISOString()
    }
];
