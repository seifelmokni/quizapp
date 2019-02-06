import { Injectable } from '@angular/core';

import { AnswerToSend } from '@app/domain/answer';
import { StateService } from '@app/core';

@Injectable()
export class QuestionService {

  constructor(
    private stateService: StateService,
  ) { }


  public markAnswerAs(
    correctAnswerId: number,
    userAnswerId: number,
    usersAnswers: Object
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        const correctAnswer = document.getElementById(`answer-${correctAnswerId}`);
        const yourAnswer = document.getElementById(`answer-${userAnswerId}`);
        if (usersAnswers) {
          for (const answerId of Object.keys(usersAnswers)) {
            const answer = document.getElementById(`answer-${answerId}`);
            if (answer) {
              const answerCounter = answer.getElementsByClassName(
                'users-answers-count'
              )[0];
              answerCounter.innerHTML = usersAnswers[answerId] + '%'; // .count
            }
          }
        }
        resolve({
          correctAnswer,
          yourAnswer
        });
       }, 200); // ??
    });
  }

  /**
   * Send an user spent life request
   *
   * @memberof QuestionService
   */
  public useExtraLife(): void {
    const answer: AnswerToSend = {
      answerId: null,
      useLife: true
    };
    this.stateService.sendAnswer(answer);
  }

  public handleAnswer (answerId: number): void {
    const answer: AnswerToSend = {
      answerId: answerId,
      useLife: false
    };
    this.stateService.sendAnswer(answer);
  }

  public handleNoAnswer(): void {
    const answer: AnswerToSend = {
      answerId: null,
      useLife: false
    };
    this.stateService.sendAnswer(answer);
  }
}
