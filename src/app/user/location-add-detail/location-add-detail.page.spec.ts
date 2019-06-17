import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddDetailPage } from './location-add-detail.page';

describe('LocationAddDetailPage', () => {
  let component: LocationAddDetailPage;
  let fixture: ComponentFixture<LocationAddDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAddDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAddDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
