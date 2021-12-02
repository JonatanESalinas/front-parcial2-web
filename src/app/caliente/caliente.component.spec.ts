import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalienteComponent } from './caliente.component';

describe('CalienteComponent', () => {
  let component: CalienteComponent;
  let fixture: ComponentFixture<CalienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
