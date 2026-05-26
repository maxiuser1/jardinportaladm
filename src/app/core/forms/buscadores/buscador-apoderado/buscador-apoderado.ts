import { Component, model, output, inject, signal, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../../environments/environment';
import { limpiarRut, formatearRut, validarRut, parseRut } from '../../validators/rut-cl';
import { ApoderadoBuscadoVm } from '@model/vm/apoderado-buscado-vm';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

@Component({
    selector: 'app-buscador-apoderado',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './buscador-apoderado.html',
    styleUrl: './buscador-apoderado.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuscadorApoderado implements FormValueControl<string> {
    value = model('');
    touched = model<boolean>(false);
    disabled = input<boolean>(false);
    readonly = input<boolean>(false);
    hidden = input<boolean>(false);
    invalid = input<boolean>(false);
    errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

    apoderadoEncontrado = output<ApoderadoBuscadoVm | null>();
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
        console.log('isvalid', rawVal, parsed.isValid);
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
