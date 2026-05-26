import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calle } from './calle';

describe('Calle', () => {
  let component: Calle;
  let fixture: ComponentFixture<Calle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calle],
    }).compileComponents();

    fixture = TestBed.createComponent(Calle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
