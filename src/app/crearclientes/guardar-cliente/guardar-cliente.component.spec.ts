import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarClienteComponent } from './guardar-cliente.component';

describe('GuardarClienteComponent', () => {
  let component: GuardarClienteComponent;
  let fixture: ComponentFixture<GuardarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardarClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
