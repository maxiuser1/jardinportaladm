import { Component, computed, inject, signal, OnInit } from '@angular/core';
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

const NOMBRES_MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

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

  diaDesde = signal<number>(1);
  mesDesde = signal<number>(1);
  diaHasta = signal<number>(31);
  mesHasta = signal<number>(12);

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

  async ngOnInit() {
    try {
      const response = await firstValueFrom(
        this.http.get<{ vm: JardinDetalleVm }>(
          `${environment.api}adm/jardines/${this.jardinId}`
        )
      );
      if (response && response.vm) {
        const vm = response.vm;
        const periodoDesde = vm.periodo?.desde || '01-01';
        const periodoHasta = vm.periodo?.hasta || '31-12';

        const [dDesdeStr, mDesdeStr] = periodoDesde.split('-');
        const [dHastaStr, mHastaStr] = periodoHasta.split('-');

        const dDesde = parseInt(dDesdeStr, 10) || 1;
        const mDesde = parseInt(mDesdeStr, 10) || 1;
        const dHasta = parseInt(dHastaStr, 10) || 31;
        let mHasta = parseInt(mHastaStr, 10) || 12;

        if (mHasta < mDesde) {
          mHasta += 12; // Traslapado al año siguiente
        }

        this.diaDesde.set(dDesde);
        this.mesDesde.set(mDesde);
        this.diaHasta.set(dHasta);
        this.mesHasta.set(mHasta);

        this.model.set({
          nombreComercial: vm.nombreComercial,
          razonSocial: vm.razonSocial,
          ruc: vm.ruc,
          correoFacturacion: vm.correoFacturacion,
          responsablePago: vm.responsablePago,
          moneda: vm.moneda,
          codigoAutorizacionDescuento: vm.codigoAutorizacionDescuento || '',
          vigenciaCotizacion: vm.vigenciaCotizacion,
          periodoDesde,
          periodoHasta,
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
      const raw = this.model();
      const payload = {
        nombreComercial: raw.nombreComercial,
        razonSocial: raw.razonSocial,
        ruc: raw.ruc,
        correoFacturacion: raw.correoFacturacion,
        responsablePago: raw.responsablePago,
        moneda: raw.moneda,
        codigoAutorizacionDescuento: raw.codigoAutorizacionDescuento.trim(),
        vigenciaCotizacion: raw.vigenciaCotizacion,
        periodo: {
          desde: raw.periodoDesde,
          hasta: raw.periodoHasta,
        },
      };

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
