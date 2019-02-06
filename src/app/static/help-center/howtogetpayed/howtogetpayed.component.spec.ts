import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoGetPayedComponent } from './howtogetpayed.component';

describe('HowtoGetPayedComponent', () => {
  let component: HowtoGetPayedComponent;
  let fixture: ComponentFixture<HowtoGetPayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoGetPayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoGetPayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
