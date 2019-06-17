import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreLocationListComponent } from './more-location-list.component';

describe('MoreLocationListComponent', () => {
  let component: MoreLocationListComponent;
  let fixture: ComponentFixture<MoreLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreLocationListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
