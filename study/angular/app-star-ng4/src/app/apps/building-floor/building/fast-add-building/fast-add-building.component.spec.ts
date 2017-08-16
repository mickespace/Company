import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastAddBuildingComponent } from './fast-add-building.component';

describe('FastAddBuildingComponent', () => {
  let component: FastAddBuildingComponent;
  let fixture: ComponentFixture<FastAddBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastAddBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastAddBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
