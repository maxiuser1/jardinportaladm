import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { JardinDetalleVm } from '@model/vm/adm/jardin-detalle-vm';

@Component({
  selector: 'app-detalle-jardin',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './detalle-jardin.html',
  styleUrl: './detalle-jardin.scss',
})
export class DetalleJardin {
  private route = inject(ActivatedRoute);

  jardinId = this.route.snapshot.params['id'];

  jardinResource = httpResource<{ vm: JardinDetalleVm }>(() => `${environment.api}adm/jardines/${this.jardinId}`);

  displayedColumns: string[] = ['nombre', 'contactoNombre', 'contactoEmail', 'estado'];
}
