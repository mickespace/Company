import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorListComponent } from './floor-list.component';

describe('FloorListComponent', () => {
  let component: FloorListComponent;
  let fixture: ComponentFixture<FloorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
