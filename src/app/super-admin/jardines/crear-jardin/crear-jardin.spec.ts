import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearJardin } from './crear-jardin';

describe('CrearJardin', () => {
  let component: CrearJardin;
  let fixture: ComponentFixture<CrearJardin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearJardin],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearJardin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
