import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorApoderado } from './buscador-apoderado';

describe('BuscadorApoderado', () => {
  let component: BuscadorApoderado;
  let fixture: ComponentFixture<BuscadorApoderado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorApoderado],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorApoderado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
