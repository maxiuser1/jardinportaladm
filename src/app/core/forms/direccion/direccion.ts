import { Component, computed, input, model, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CalleComponent } from '../calle/calle';
import { GEO_CHI } from '../../data/geo';
import { FieldTree, FormField } from '@angular/forms/signals';
import { DireccionFrm } from '@model/vm/bo/cotizacion/direccion-frm';

@Component({
  selector: 'app-direccion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    CalleComponent,
    FormField,
  ],
  templateUrl: './direccion.html',
  styleUrl: './direccion.scss',
})
export class Direccion {
  readonly regiones = GEO_CHI;
  form = input.required<FieldTree<DireccionFrm>>();

  comunas = computed(() => {
    if (!this.form().region().value()) return [];
    return GEO_CHI.find(r => r.region === this.form().region().value()!)?.comunas || [];
  });

  regionSelectedChanged() {
    this.form().comuna().value.set('');
  }

  onDireccionLocalizada(details: { calle: string; region: string; comuna: string; numero: string; ciudad: string }) {
    if (details.calle) {
      this.form().calle().value.set(details.calle);
    }
    if (details.region) {
      this.form().region().value.set(details.region);
    }
    if (details.comuna) {
      this.form().comuna().value.set(details.comuna);
    }
    if (details.numero) {
      this.form().numero().value.set(details.numero);
    }
  }
}
