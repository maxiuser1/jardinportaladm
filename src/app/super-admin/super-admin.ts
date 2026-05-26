import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Dispatcher } from '@ngrx/signals/events';
import { JardinHeader } from './shared/header/header';
import { JardinMenu } from './shared/menu/menu';
import { jardinEvents } from './state/jardines.state';
@Component({
  selector: 'app-super-admin',
  imports: [RouterOutlet, JardinHeader, JardinMenu, MatSidenavContainer, MatSidenavModule],
  templateUrl: './super-admin.html',
  styleUrl: './super-admin.scss',
})
export class SuperAdmin {

  opened: WritableSignal<boolean> = signal(false);
  isDesktop: WritableSignal<boolean> = signal(false);

  private breakpointObserver = inject(BreakpointObserver);
  private dispatcher = inject(Dispatcher);

  constructor() {
    this.dispatcher.dispatch(jardinEvents.opened());

    this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .subscribe(result => {
        const desktop = result.matches;
        this.isDesktop.set(desktop);
        this.opened.set(desktop);
      });
  }

}
