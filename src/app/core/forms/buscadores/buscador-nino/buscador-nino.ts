import { Component, model, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../../environments/environment';
import { limpiarRut, formatearRut, parseRut } from '../../validators/rut-cl';
import { ApoderadoBuscadoVm } from '@model/vm/apoderado-buscado-vm';



@Component({
  selector: 'app-buscador-nino',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './buscador-nino.html',
  styleUrl: './buscador-nino.scss',
})
export class BuscadorNino {
  value = model('');

  apoderadoEncontrado = output<any | null>();
  isLoading = signal(false);

  private http = inject(HttpClient);

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

  onBlur() {
    const rawVal = this.value();
    if (!rawVal) {
      this.apoderadoEncontrado.emit(null);
      return;
    }

    const clean = limpiarRut(rawVal);
    if (!clean) {
      this.apoderadoEncontrado.emit(null);
      return;
    }

    const parsed = parseRut(rawVal);
    if (!parsed.isValid) {
      this.apoderadoEncontrado.emit(null);
      return;
    }
    const formatted = formatearRut(clean);
    this.value.set(formatted);
    const url = `${environment.api}bo/personas/${parsed.digits}`;
    this.http.get<ApoderadoBuscadoVm>(url).subscribe({
      next: (result) => {
        this.apoderadoEncontrado.emit(result || null);
      },
      error: (err) => {
        console.error('Error al buscar apoderado:', err);
        this.apoderadoEncontrado.emit(null);
      }
    });
  }
}
