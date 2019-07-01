import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationPage } from './cancellation.page';

describe('CancellationPage', () => {
  let component: CancellationPage;
  let fixture: ComponentFixture<CancellationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
