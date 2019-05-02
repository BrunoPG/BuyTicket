import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSetorPage } from './cadastro-setor.page';

describe('CadastroSetorPage', () => {
  let component: CadastroSetorPage;
  let fixture: ComponentFixture<CadastroSetorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroSetorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSetorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
