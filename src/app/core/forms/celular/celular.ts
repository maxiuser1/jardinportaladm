import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-celular',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './celular.html',
  styleUrl: './celular.scss',
})
export class CelularComponent implements FormValueControl<string> {
  value = model('');

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cleanValue = input.value.replace(/\D/g, '');
    this.value.set(cleanValue);
    input.value = cleanValue;
  }
}
