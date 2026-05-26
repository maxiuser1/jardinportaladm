import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleJardin } from './detalle-jardin';

describe('DetalleJardin', () => {
  let component: DetalleJardin;
  let fixture: ComponentFixture<DetalleJardin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleJardin],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleJardin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
