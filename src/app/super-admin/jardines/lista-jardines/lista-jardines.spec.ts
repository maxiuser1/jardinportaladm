import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJardines } from './lista-jardines';

describe('ListaJardines', () => {
  let component: ListaJardines;
  let fixture: ComponentFixture<ListaJardines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaJardines],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaJardines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
