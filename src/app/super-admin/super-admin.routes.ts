import { Routes } from "@angular/router";
import { SuperAdmin } from "./super-admin";
import { ListaJardines } from "./lista-jardines/lista-jardines";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: SuperAdmin,
        children: [
            { path: '', component: ListaJardines },
        ]
    }
];
