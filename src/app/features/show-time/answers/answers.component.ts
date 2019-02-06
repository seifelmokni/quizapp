import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from '@app/domain';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html'
})
export class AnswersComponent implements OnInit {
  @Input()
  answers: Answer[];
  @Input()
  clicked: boolean;
  @Output()
  answerData = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onAnswer(answerId: number) {
    if (this.clicked) {
      return;
    }

    document
      .getElementById(`answer-${answerId.toString()}`)
      .classList.add('selected');

    this.answerData.emit(answerId);
  }
}
