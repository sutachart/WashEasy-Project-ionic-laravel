import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsMapPage } from './gps-map.page';

describe('GpsMapPage', () => {
  let component: GpsMapPage;
  let fixture: ComponentFixture<GpsMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
