import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorNino } from './buscador-nino';

describe('BuscadorNino', () => {
  let component: BuscadorNino;
  let fixture: ComponentFixture<BuscadorNino>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorNino],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorNino);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
