import { Component, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../../environments/environment';
import { JardinItemVm } from '@model/vm/adm/jardin-item-vm';

@Component({
  selector: 'app-lista-jardines',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './lista-jardines.html',
  styleUrl: './lista-jardines.scss',
})
export class ListaJardines {
  private router = inject(Router);

  jardinesResource = httpResource<JardinItemVm[]>(() => `${environment.api}adm/jardines`);

  displayedColumns: string[] = ['nombreComercial', 'razonSocial', 'ruc', 'planVigente', 'estado', 'acciones'];

  verDetalle(id: string) {
    this.router.navigate(['/jardines', id]);
  }
}
