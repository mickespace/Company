import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastAddFloorComponent } from './fast-add-floor.component';

describe('FastAddFloorComponent', () => {
  let component: FastAddFloorComponent;
  let fixture: ComponentFixture<FastAddFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastAddFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastAddFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
