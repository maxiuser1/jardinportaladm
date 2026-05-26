import { Component, inject, model } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { jardinEvents, JardinStore } from '../../state/jardines.state';
import { AuthService } from '../../../core/auth/auth.service';
import { Dispatcher } from '@ngrx/signals/events';

@Component({
  selector: 'jardin-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class JardinHeader {
  opened = model(false);
  readonly store = inject(JardinStore);
  readonly dispatcher = inject(Dispatcher);
  authService = inject(AuthService);
  router = inject(Router);

  menued() {
    this.opened.update((opened) => !opened);
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/ingreso']);
  }

  cambiarSucursal(id: string) {
    this.dispatcher.dispatch(jardinEvents.sucursalCambiada(id));
  }
}
