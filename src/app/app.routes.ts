import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
    {
        path: 'ingreso',
        loadComponent: () => import('./publico/ingreso/ingreso').then(m => m.Ingreso)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./super-admin/super-admin.routes').then((m) => m.ADMIN_ROUTES),
    }
];
