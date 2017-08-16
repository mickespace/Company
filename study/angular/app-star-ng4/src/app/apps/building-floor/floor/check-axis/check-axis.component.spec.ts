import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAxisComponent } from './check-axis.component';

describe('CheckAxisComponent', () => {
  let component: CheckAxisComponent;
  let fixture: ComponentFixture<CheckAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
