import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioUf } from './cambio-uf';

describe('CambioUf', () => {
  let component: CambioUf;
  let fixture: ComponentFixture<CambioUf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioUf],
    }).compileComponents();

    fixture = TestBed.createComponent(CambioUf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
