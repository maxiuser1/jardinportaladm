import { Routes } from "@angular/router";
import { SuperAdmin } from "./super-admin";
import { ListaJardines } from "./jardines/lista-jardines/lista-jardines";
import { Inicio } from "./inicio/inicio";
import { DetalleJardin } from "./jardines/detalle-jardin/detalle-jardin";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: SuperAdmin,
        children: [
            { path: '', component: Inicio },
            { path: 'jardines', component: ListaJardines },
            { path: 'jardines/:id', component: DetalleJardin }
        ]
    }
];
