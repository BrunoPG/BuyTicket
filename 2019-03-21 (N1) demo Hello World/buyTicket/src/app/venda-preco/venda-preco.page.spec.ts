import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaPrecoPage } from './venda-preco.page';

describe('VendaPrecoPage', () => {
  let component: VendaPrecoPage;
  let fixture: ComponentFixture<VendaPrecoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendaPrecoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaPrecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
