import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-confirmacion',
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.scss',
})
export class Confirmacion {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  comment: string = '';
}
