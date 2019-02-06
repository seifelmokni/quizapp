import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingBgComponent } from './floating-bg.component';

describe('FloatingBgComponent', () => {
  let component: FloatingBgComponent;
  let fixture: ComponentFixture<FloatingBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
