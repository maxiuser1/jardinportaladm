import { Sucursal } from '../model/sucursal';
import { Servicio } from '../model/servicio';

export const serviciosComunes: Servicio[] = [
    { id: "srv-matricula", nombre: "Matrícula Anual", categoria: "MATRICULA" },
    { id: "srv-mensualidad", nombre: "Mensualidad Educativa", categoria: "MENSUALIDAD" },
    { id: "srv-danza", nombre: "Taller de Danza Opcional", categoria: "ADICIONAL" }
];

export const seedSucursalBrillantes: Sucursal = {
    id: "brillantes",
    tenant: "inabif",
    creado: new Date().toISOString(),
    actualizado: null,
    tipo: "sucursal",
    nombre: "Brillantes",
    direccion: {
        region: "",
        comuna: "",
        calle: "Av. Los Brillantes 123",
        numero: "",
        interior: ""
    },
    niveles: [
        { id: "n-2", nombre: "2 años", edadCorrespondiente: 2, estaDeshabilitado: false },
        { id: "n-3", nombre: "3 años", edadCorrespondiente: 3, estaDeshabilitado: false },
        { id: "n-4", nombre: "4 años", edadCorrespondiente: 4, estaDeshabilitado: false },
        { id: "n-5", nombre: "5 años", edadCorrespondiente: 5, estaDeshabilitado: false }
    ],
    jornadas: [
        { id: "manana", nombre: "Mañana", descripcion: null, horaEntrada: "08:30", horaSalida: "13:00", estaDeshabilitado: false, diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] },
        { id: "tarde", nombre: "Tarde", descripcion: null, horaEntrada: "14:00", horaSalida: "18:30", estaDeshabilitado: false, diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] }
    ],
    salas: [
        { id: "uvitas", nombre: "Uvitas 2 años", capacidad: 20, estaDeshabilitado: false },
        { id: "fresitas", nombre: "Fresitas 3 años", capacidad: 20, estaDeshabilitado: false },
        { id: "manzanitas", nombre: "Manzanitas 4 años", capacidad: 25, estaDeshabilitado: false },
        { id: "naranjitas", nombre: "Naranjitas 5 años", capacidad: 25, estaDeshabilitado: false }
    ],
    servicios: serviciosComunes
};

export const seedSucursalDiamantes: Sucursal = {
    id: "diamantes",
    tenant: "inabif",
    creado: new Date().toISOString(),
    actualizado: null,
    tipo: "sucursal",
    nombre: "Diamantes",
    direccion: {
        region: "",
        comuna: "",
        calle: "Calle Los Diamantes 456",
        numero: "",
        interior: ""
    },
    niveles: [
        { id: "n-2", nombre: "2 años", edadCorrespondiente: 2, estaDeshabilitado: false },
        { id: "n-3", nombre: "3 años", edadCorrespondiente: 3, estaDeshabilitado: false },
        { id: "n-4", nombre: "4 años", edadCorrespondiente: 4, estaDeshabilitado: false },
        { id: "n-5", nombre: "5 años", edadCorrespondiente: 5, estaDeshabilitado: false }
    ],
    jornadas: [
        { id: "manana", nombre: "Mañana", descripcion: null, horaEntrada: "08:30", horaSalida: "13:00", estaDeshabilitado: false, diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] },
        { id: "tarde", nombre: "Tarde", descripcion: null, horaEntrada: "14:00", horaSalida: "18:30", estaDeshabilitado: false, diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] }
    ],
    salas: [
        { id: "bebes", nombre: "Bebes 2 años", capacidad: 15, estaDeshabilitado: false },
        { id: "peques", nombre: "Peques 3 años", capacidad: 20, estaDeshabilitado: false },
        { id: "hermano-menor", nombre: "Hermano menor 4 años", capacidad: 20, estaDeshabilitado: false },
        { id: "hermano-mayor", nombre: "Hermano Mayor 5 años", capacidad: 25, estaDeshabilitado: false }
    ],
    servicios: serviciosComunes
};

export const seedSucursalPrincipalSJ: Sucursal = {
    id: "principal",
    tenant: "sanjuan",
    creado: new Date().toISOString(),
    actualizado: null,
    tipo: "sucursal",
    nombre: "Sede Principal San Juan",
    direccion: {
        region: "",
        comuna: "",
        calle: "Av. Las Flores 789",
        numero: "",
        interior: ""
    },
    niveles: [
        { id: "sj-1", nombre: "Cuna (2 años)", edadCorrespondiente: 2, estaDeshabilitado: false },
        { id: "sj-2", nombre: "Jardín (4 años)", edadCorrespondiente: 4, estaDeshabilitado: false },
        { id: "sj-3", nombre: "Transición (5 años)", edadCorrespondiente: 5, estaDeshabilitado: false }
    ],
    jornadas: [
        { id: "completa", nombre: "Jornada Completa", descripcion: null, horaEntrada: "08:30", horaSalida: "18:30", estaDeshabilitado: false, diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] },
        { id: "mediodia", nombre: "Medio Día", descripcion: null, horaEntrada: "08:30", horaSalida: "13:30", estaDeshabilitado: false, diasSemana: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'] }
    ],
    salas: [
        { id: "sala-cuna", nombre: "Sala Cuna", capacidad: 15, estaDeshabilitado: false },
        { id: "sala-jardin", nombre: "Sala Jardín", capacidad: 25, estaDeshabilitado: false },
        { id: "sala-magica", nombre: "Sala Mágica", capacidad: 25, estaDeshabilitado: false }
    ],
    servicios: serviciosComunes
};
