import { Jardin } from '../model/jardin';

export const seedJardinInabif: Jardin = {
    id: "inabif",
    creado: new Date().toISOString(),
    actualizado: null,
    tipo: "jardin",
    nombreComercial: "Inabif",
    razonSocial: "Institución Nacional de Bienestar Familiar",
    ruc: "20100000001",
    correoFacturacion: "administracion@inabif.gob",
    responsablePago: "Director General",
    planVigente: "SAAS-KIDS-PREMIUM",
    fechaInicioPlan: "2026-01-01T00:00:00Z",
    fechaFinPlan: "2027-01-01T23:59:59Z",
    estado: "ACTIVO",
    moneda: "UF",
    intermediarios: [
        {
            id: "int-telefonica",
            tipo: "intermediario",
            nombre: "Convenio Telefónica",
            contactoNombre: "Juan Perez",
            contactoEmail: "convenios@telefonica.com",
            estado: "ACTIVO"
        },
        {
            id: "int-claro",
            tipo: "intermediario",
            nombre: "Convenio Claro",
            contactoNombre: "Maria Garcia",
            contactoEmail: "convenios@claro.com",
            estado: "ACTIVO"
        }
    ],
    estilos: {
        rutaLogo: "/assets/logos/inabif.png",
        primary: "#4f46e5",
        secondary: "#0f172a",
        accent: "#22c55e"
    },
    vigenciaCotizacion: 30,
    periodo: {
        desde: "01-01",
        hasta: "31-12"
    }
};

export const seedJardinSanJuan: Jardin = {
    id: "sanjuan",
    creado: new Date().toISOString(),
    actualizado: null,
    tipo: "jardin",
    nombreComercial: "San Juan",
    razonSocial: "Guardería San Juan SAC",
    ruc: "20200000002",
    correoFacturacion: "admin@sanjuan.com",
    responsablePago: "Directora San Juan",
    planVigente: "SAAS-KIDS-BASIC",
    fechaInicioPlan: "2026-01-01T00:00:00Z",
    fechaFinPlan: "2027-01-01T23:59:59Z",
    estado: "ACTIVO",
    moneda: "CLP",
    intermediarios: [], // Sin convenios empresariales
    estilos: {
        rutaLogo: "/assets/logos/sanjuan.png",
        primary: "#f97316",
        secondary: "#1f2937",
        accent: "#ec4899"
    },
    vigenciaCotizacion: 15,
    periodo: {
        desde: "01-01",
        hasta: "31-12"
    }
};
