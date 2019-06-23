import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaIngressoPage } from './venda-ingresso.page';

describe('VendaIngressoPage', () => {
  let component: VendaIngressoPage;
  let fixture: ComponentFixture<VendaIngressoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendaIngressoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaIngressoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
