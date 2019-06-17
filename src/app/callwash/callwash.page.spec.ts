import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallwashPage } from './callwash.page';

describe('CallwashPage', () => {
  let component: CallwashPage;
  let fixture: ComponentFixture<CallwashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallwashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallwashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
