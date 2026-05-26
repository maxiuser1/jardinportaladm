import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EDITAR_JARDIN_DEFAULT, EditarJardinForm } from './editar-jardin.types';
import { editarJardinSchema } from './editar-jardin.schema';
import { Errores } from '../../../../lib/components/errores/errores';
import { environment } from '../../../../environments/environment';
import { JardinDetalleVm } from '@model/vm/adm/jardin-detalle-vm';

@Component({
  selector: 'app-editar-jardin',
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
    MatProgressSpinnerModule,
    FormRoot,
    FormField,
    Errores,
  ],
  templateUrl: './editar-jardin.html',
  styleUrl: './editar-jardin.scss',
})
export class EditarJardin implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  jardinId = this.route.snapshot.params['id'];
  model = signal<EditarJardinForm>(EDITAR_JARDIN_DEFAULT);
  cargando = signal(false);
  cargandoInicial = signal(true);

  form = form(this.model, editarJardinSchema);

  async ngOnInit() {
    try {
      const response = await firstValueFrom(
        this.http.get<{ vm: JardinDetalleVm }>(
          `${environment.api}adm/jardines/${this.jardinId}`
        )
      );
      if (response && response.vm) {
        const vm = response.vm;
        this.model.set({
          nombreComercial: vm.nombreComercial,
          razonSocial: vm.razonSocial,
          ruc: vm.ruc,
          correoFacturacion: vm.correoFacturacion,
          responsablePago: vm.responsablePago,
          moneda: vm.moneda,
          vigenciaCotizacion: vm.vigenciaCotizacion,
        });
      }
    } catch (err) {
      console.error('Error al cargar datos del jardín:', err);
    } finally {
      this.cargandoInicial.set(false);
    }
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
        this.http.patch(
          `${environment.api}adm/jardines/${this.jardinId}`,
          payload
        )
      );
      this.router.navigate(['/jardines']);
    } catch (err) {
      console.error('Error al actualizar el jardín:', err);
    } finally {
      this.cargando.set(false);
    }
  }
}
