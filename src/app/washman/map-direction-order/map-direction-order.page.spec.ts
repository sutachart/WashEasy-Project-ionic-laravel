import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDirectionOrderPage } from './map-direction-order.page';

describe('MapDirectionOrderPage', () => {
  let component: MapDirectionOrderPage;
  let fixture: ComponentFixture<MapDirectionOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDirectionOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDirectionOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
