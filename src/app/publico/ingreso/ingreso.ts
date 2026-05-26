import { Component, inject, signal } from '@angular/core';
import { AuthResponse, IngresoForm, ingresoDefault } from './ingreso.types';
import { ingresoSchema } from './ingreso.schema';
import { form, submit } from '@angular/forms/signals';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Errores } from '../../../lib/components/errores/errores';
import { FormRoot, FormField } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { UsuarioVm } from '@model/vm/bo/usuario-vm';
import { Dispatcher } from '@ngrx/signals/events';
import { jardinEvents, JardinStore } from '../../super-admin/state/jardines.state';

@Component({
  selector: 'app-ingreso',
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    Errores,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormRoot,
    FormField,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './ingreso.html',
  styleUrl: './ingreso.scss',
})
export class Ingreso {
  model = signal<IngresoForm>(ingresoDefault);
  hide = signal(true);
  router = inject(Router);
  http = inject(HttpClient);

  readonly dispatcher = inject(Dispatcher);
  readonly store = inject(JardinStore);

  form = form(this.model, ingresoSchema, {
    submission: {
      action: async (field) => {
        const resp = await firstValueFrom(this.http.post<AuthResponse>(`${environment.api}adm/login`, field().value()));
        if (resp.token) {
          localStorage.setItem('tokenadm', resp.token);
          const userResp = await firstValueFrom(this.http.get<UsuarioVm>(`${environment.api}adm/me`, {
            headers: {
              'x-custom-authorization': `Bearer ${resp.token}`
            }
          }));
          this.dispatcher.dispatch(jardinEvents.usuarioCargado(userResp));
          await this.router.navigate(['/']);
          return;
        }
        else {
          return {
            kind: 'serverError', message: resp.mensaje || '', fieldTree: field.correo
          };
        }
      },
      onInvalid: (field) => {
        console.log(this.form().errors());
        console.log('field invalid', field());
      }
    }
  });

  test() {
    console.log('as', this.form().errors());
  }
}