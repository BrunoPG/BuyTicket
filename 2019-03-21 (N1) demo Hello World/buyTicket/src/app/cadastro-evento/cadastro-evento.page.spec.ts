import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEventoPage } from './cadastro-evento.page';

describe('CadastroEventoPage', () => {
  let component: CadastroEventoPage;
  let fixture: ComponentFixture<CadastroEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
