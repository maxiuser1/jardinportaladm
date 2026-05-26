import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'cargando',
  imports: [MatProgressSpinnerModule],
  templateUrl: './cargando.html',
  styleUrl: './cargando.scss',
})
export class Cargando { }
