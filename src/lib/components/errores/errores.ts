import { JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: '[errores]',
  templateUrl: './errores.html',
  styleUrl: './errores.scss',
  host: {
    display: 'contents',
  },
})
export class Errores {
  readonly fieldState = input.required<FieldState<unknown, string>>();

  getMessage(kind: string) {
    switch (kind) {
      case 'required':
        return 'Campo requerido';
      case 'email':
        return 'Correo no válido';
      case 'maxLength':
        return 'El campo es demasiado largo';
      default:
        return 'Error';
    }
  }
}
