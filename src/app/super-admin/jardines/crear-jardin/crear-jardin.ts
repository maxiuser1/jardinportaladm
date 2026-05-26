import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { form, FormRoot, FormField } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CREAR_JARDIN_DEFAULT, CrearJardinForm } from './crear-jardin.types';
import { crearJardinSchema } from './crear-jardin.schema';
import { Errores } from '../../../../lib/components/errores/errores';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-crear-jardin',
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    FormRoot,
    FormField,
    Errores,
  ],
  templateUrl: './crear-jardin.html',
  styleUrl: './crear-jardin.scss',
})
export class CrearJardin {
  private router = inject(Router);
  private http = inject(HttpClient);

  model = signal<CrearJardinForm>(CREAR_JARDIN_DEFAULT);
  cargando = signal(false);

  form = form(this.model, crearJardinSchema);

  generarSlug(nombre: string): string {
    return nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  onNombreInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const slug = this.generarSlug(input.value);
    this.form.id().value.set(slug);
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.form().valid() || this.cargando()) {
      return;
    }

    this.cargando.set(true);
    try {
      const payload = this.model();
      await firstValueFrom(
        this.http.post(`${environment.api}adm/jardines`, payload)
      );
      this.router.navigate(['/jardines']);
    } catch (err: any) {
      console.error('Error al crear jardín:', err);
      // Podríamos mostrar un mensaje de error o asignarlo al form si es necesario
    } finally {
      this.cargando.set(false);
    }
  }
}
