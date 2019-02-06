import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoPlayComponent } from './howtoplay.component';

describe('HowtoPlayComponent', () => {
  let component: HowtoPlayComponent;
  let fixture: ComponentFixture<HowtoPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
