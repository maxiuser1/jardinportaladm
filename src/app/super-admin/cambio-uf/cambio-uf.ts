import { Component, inject } from '@angular/core';
import { httpResource, HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../environments/environment';
import { ParamUf } from '@model/shared/paramUf';
import { firstValueFrom } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cambio-uf',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DecimalPipe
  ],
  templateUrl: './cambio-uf.html',
  styleUrl: './cambio-uf.scss',
})
export class CambioUf {
  private http = inject(HttpClient);

  // Load UF data using httpResource
  ufsResource = httpResource<ParamUf[]>(() => `${environment.api}adm/uf`);

  displayedColumns: string[] = ['fecha', 'valor', 'tenant', 'tipo'];

  // Map UF ID to printable date format YYYY-MM-DD
  formatIdToDate(id: string): string {
    if (id.startsWith('UF') && id.length === 10) {
      const year = id.substring(2, 6);
      const month = id.substring(6, 8);
      const day = id.substring(8, 10);
      return `${year}-${month}-${day}`;
    }
    return id;
  }

  // Get date object from ID for sorting
  private getDateFromId(id: string): number {
    if (id.startsWith('UF') && id.length === 10) {
      const year = parseInt(id.substring(2, 6), 10);
      const month = parseInt(id.substring(6, 8), 10) - 1;
      const day = parseInt(id.substring(8, 10), 10);
      return new Date(year, month, day).getTime();
    }
    return 0;
  }

  // Return values ordered from most recent to oldest
  getUfsSorted(): ParamUf[] {
    const raw = this.ufsResource.value() || [];
    return [...raw].sort((a, b) => this.getDateFromId(b.id) - this.getDateFromId(a.id));
  }

  async cargarValores() {
    try {
      await firstValueFrom(this.http.post(`${environment.api}adm/uf/cargar`, {}));
      this.ufsResource.reload();
    } catch (err) {
      console.error('Error al poblar UFs:', err);
    }
  }
}
