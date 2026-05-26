import { Component, inject, input, model } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { JardinStore } from '../../state/jardines.state';

@Component({
  selector: 'jardin-menu',
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class JardinMenu {
  opened = model(false);
  isDesktop = input(false);
  router = inject(Router);
  readonly store = inject(JardinStore);

  redireccionar(route: string) {
    if (!route) return;

    if (!this.isDesktop()) {
      this.opened.set(false);
    }
    this.router.navigate([route]);
  }
}
