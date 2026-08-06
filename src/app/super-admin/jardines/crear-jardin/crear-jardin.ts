import { Component, computed, inject, signal } from '@angular/core';
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

const NOMBRES_MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

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

  // Opciones de selección para el periodo
  dias = Array.from({ length: 31 }, (_, i) => i + 1);

  mesesInicio = NOMBRES_MESES.map((nombre, index) => ({
    valor: index + 1,
    nombre: `${String(index + 1).padStart(2, '0')} - ${nombre}`
  }));

  mesesFin = [
    ...NOMBRES_MESES.map((nombre, index) => ({
      valor: index + 1,
      nombre: `${String(index + 1).padStart(2, '0')} - ${nombre}`
    })),
    ...NOMBRES_MESES.map((nombre, index) => ({
      valor: index + 13,
      nombre: `${String(index + 1).padStart(2, '0')} - ${nombre} (Año Siguiente)`
    }))
  ];

  // Estado interno para armar periodo (desde/hasta)
  diaDesde = signal<number>(1);
  mesDesde = signal<number>(1);
  diaHasta = signal<number>(31);
  mesHasta = signal<number>(12);

  // Indica si el periodo se traslapa al año siguiente
  esPeriodoTraslapado = computed(() => {
    return this.mesHasta() > 12 || this.mesHasta() < this.mesDesde();
  });

  actualizarPeriodoDesde() {
    const dd = String(this.diaDesde()).padStart(2, '0');
    const mm = String(this.mesDesde()).padStart(2, '0');
    this.form.periodoDesde().value.set(`${dd}-${mm}`);
  }

  actualizarPeriodoHasta() {
    const dd = String(this.diaHasta()).padStart(2, '0');
    const mesReal = ((this.mesHasta() - 1) % 12) + 1;
    const mm = String(mesReal).padStart(2, '0');
    this.form.periodoHasta().value.set(`${dd}-${mm}`);
  }

  onDiaDesdeChange(dia: number) {
    this.diaDesde.set(dia);
    this.actualizarPeriodoDesde();
  }

  onMesDesdeChange(mes: number) {
    this.mesDesde.set(mes);
    this.actualizarPeriodoDesde();
  }

  onDiaHastaChange(dia: number) {
    this.diaHasta.set(dia);
    this.actualizarPeriodoHasta();
  }

  onMesHastaChange(mes: number) {
    this.mesHasta.set(mes);
    this.actualizarPeriodoHasta();
  }

  /**
   * Helper utility para construir un objeto Date en TypeScript/JavaScript de forma transparente.
   * En JS los meses inician en 0 (0 = Enero, 11 = Diciembre).
   * Al usar meses continuos (ej. 12 = Enero año siguiente, 13 = Febrero año siguiente),
   * el constructor `new Date(year, monthIndexContinuous, day)` realiza el desborde de año automáticamente.
   */
  crearFechaPeriodo(year: number, monthIndexContinuous: number, day: number): Date {
    return new Date(year, monthIndexContinuous, day);
  }

  generarSlug(nombre: string): string {
    return nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  onNombreInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const nombre = input.value;
    const slug = this.generarSlug(nombre);
    this.form.id().value.set(slug);

    const currentSucursal = this.form.nombreSucursal().value();
    if (!currentSucursal || currentSucursal.startsWith('Sucursal Principal')) {
      const defaultSucursal = nombre.trim() ? `Sucursal Principal ${nombre.trim()}` : '';
      this.form.nombreSucursal().value.set(defaultSucursal);
    }
  }

  onColorChange(field: 'estilosPrimary' | 'estilosSecondary' | 'estilosAccent', event: Event) {
    const input = event.target as HTMLInputElement;
    this.form[field]().value.set(input.value);
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.form().valid() || this.cargando()) {
      return;
    }

    this.cargando.set(true);
    try {
      const formValue = this.model();
      const payload = {
        id: formValue.id,
        nombreComercial: formValue.nombreComercial,
        nombreSucursal: formValue.nombreSucursal,
        razonSocial: formValue.razonSocial,
        ruc: formValue.ruc,
        correoFacturacion: formValue.correoFacturacion,
        responsablePago: formValue.responsablePago,
        moneda: formValue.moneda,
        vigenciaCotizacion: formValue.vigenciaCotizacion,
        periodo: {
          desde: formValue.periodoDesde,
          hasta: formValue.periodoHasta,
        },
        usuarioNombres: formValue.usuarioNombres,
        usuarioApellidos: formValue.usuarioApellidos,
        usuarioCorreo: formValue.usuarioCorreo,
        usuarioClave: formValue.usuarioClave,
        estilos: {
          rutaLogo: formValue.estilosRutaLogo.trim(),
          primary: formValue.estilosPrimary || '#4f46e5',
          secondary: formValue.estilosSecondary || '#0f172a',
          accent: formValue.estilosAccent || '#22c55e',
        },
      };

      await firstValueFrom(
        this.http.post(`${environment.api}adm/jardines`, payload)
      );
      this.router.navigate(['/jardines']);
    } catch (err: any) {
      console.error('Error al crear jardín:', err);
    } finally {
      this.cargando.set(false);
    }
  }
}
