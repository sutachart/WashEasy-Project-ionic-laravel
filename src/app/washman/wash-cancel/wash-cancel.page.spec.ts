import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashCancelPage } from './wash-cancel.page';

describe('WashCancelPage', () => {
  let component: WashCancelPage;
  let fixture: ComponentFixture<WashCancelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashCancelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
