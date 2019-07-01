import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDirectionPage } from './map-direction.page';

describe('MapDirectionPage', () => {
  let component: MapDirectionPage;
  let fixture: ComponentFixture<MapDirectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDirectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDirectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
