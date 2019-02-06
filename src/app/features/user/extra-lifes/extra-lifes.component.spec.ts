import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraLifesComponent } from './extra-lifes.component';

describe('ExtraLifesComponent', () => {
  let component: ExtraLifesComponent;
  let fixture: ComponentFixture<ExtraLifesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraLifesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraLifesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
