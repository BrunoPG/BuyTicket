import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSalaPage } from './cadastro-sala.page';

describe('CadastroSalaPage', () => {
  let component: CadastroSalaPage;
  let fixture: ComponentFixture<CadastroSalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroSalaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
