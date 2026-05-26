import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Celular } from './celular';

describe('Celular', () => {
  let component: Celular;
  let fixture: ComponentFixture<Celular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Celular],
    }).compileComponents();

    fixture = TestBed.createComponent(Celular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
