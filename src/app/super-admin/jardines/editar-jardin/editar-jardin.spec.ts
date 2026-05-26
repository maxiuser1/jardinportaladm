import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarJardin } from './editar-jardin';

describe('EditarJardin', () => {
  let component: EditarJardin;
  let fixture: ComponentFixture<EditarJardin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarJardin],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarJardin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
