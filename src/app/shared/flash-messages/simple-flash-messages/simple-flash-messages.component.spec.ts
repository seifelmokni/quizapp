import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFlashMessagesComponent } from './simple-flash-messages.component';

describe('SimpleFlashMessagesComponent', () => {
  let component: SimpleFlashMessagesComponent;
  let fixture: ComponentFixture<SimpleFlashMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleFlashMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleFlashMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
