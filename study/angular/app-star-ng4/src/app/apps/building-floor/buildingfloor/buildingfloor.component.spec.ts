import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingfloorComponent } from './buildingfloor.component';

describe('BuildingfloorComponent', () => {
  let component: BuildingfloorComponent;
  let fixture: ComponentFixture<BuildingfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
