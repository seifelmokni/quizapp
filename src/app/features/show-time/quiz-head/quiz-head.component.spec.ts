import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizHeadComponent } from './quiz-head.component';

describe('QuizHeadComponent', () => {
  let component: QuizHeadComponent;
  let fixture: ComponentFixture<QuizHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizHeadComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
