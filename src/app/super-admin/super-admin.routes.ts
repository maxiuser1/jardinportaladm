import { Routes } from "@angular/router";
import { SuperAdmin } from "./super-admin";
import { ListaJardines } from "./jardines/lista-jardines/lista-jardines";
import { Inicio } from "./inicio/inicio";
import { DetalleJardin } from "./jardines/detalle-jardin/detalle-jardin";
import { CrearJardin } from "./jardines/crear-jardin/crear-jardin";
import { EditarJardin } from "./jardines/editar-jardin/editar-jardin";
import { CambioUf } from "./cambio-uf/cambio-uf";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: SuperAdmin,
        children: [
            { path: '', component: Inicio },
            { path: 'jardines', component: ListaJardines },
            { path: 'jardines/crear', component: CrearJardin },
            { path: 'jardines/:id', component: DetalleJardin },
            { path: 'jardines/:id/editar', component: EditarJardin },
            { path: 'cambio-uf', component: CambioUf }
        ]
    }
];
