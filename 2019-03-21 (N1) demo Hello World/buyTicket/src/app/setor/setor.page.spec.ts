import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorPage } from './setor.page';

describe('SetorPage', () => {
  let component: SetorPage;
  let fixture: ComponentFixture<SetorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
