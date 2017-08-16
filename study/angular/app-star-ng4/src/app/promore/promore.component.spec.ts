import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoreComponent } from './promore.component';

describe('PromoreComponent', () => {
  let component: PromoreComponent;
  let fixture: ComponentFixture<PromoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
