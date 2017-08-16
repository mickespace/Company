import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpmodelComponent } from './upmodel.component';

describe('UpmodelComponent', () => {
  let component: UpmodelComponent;
  let fixture: ComponentFixture<UpmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
