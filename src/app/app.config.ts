import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { authInterceptor } from '../lib/components/errores/auth/auth.interceptor';
import { errorInterceptor } from './core/infra/error.interceptor';
import { loadingInterceptor } from './core/infra/loading.interceptor';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth/auth.service';
import { UsuarioVm } from '@model/vm/bo/usuario-vm';
import { Dispatcher } from '@ngrx/signals/events';
import { jardinEvents, JardinStore } from './super-admin/state/jardines.state';

registerLocaleData(localeEsCL);


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor, authInterceptor])),
    { provide: LOCALE_ID, useValue: 'es-CL' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    provideAppInitializer(() => {
      const http = inject(HttpClient);
      const authService = inject(AuthService);
      const dispatcher = inject(Dispatcher);
      const store = inject(JardinStore);
      const router = inject(Router);

      if (authService.estaAutenticado()) {
        console.log('appconfig');
        return firstValueFrom(
          http
            .get<UsuarioVm>(`${environment.api}adm/me`, {
              headers: {
                'x-custom-authorization': `Bearer ${localStorage.getItem('tokenadm')}`
              }
            })
            .pipe(
              tap(user => {
                dispatcher.dispatch(jardinEvents.usuarioCargado(user));
              }),
              catchError(err => {
                console.error('Error al obtener usuario actual:', err);
                authService.cerrarSesion();
                router.navigate(['/ingreso']);
                return of(null);
              })
            )
        );
      }
      return of(null)
    }),
  ]
};
