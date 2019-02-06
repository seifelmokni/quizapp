import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment as env } from '@env/environment';

import { Question, User} from '@app/domain';
import { StateService } from '@app/core';
import { UserAnswerAckEvent, AnswerReviewEvent } from '@app/core/socket';

import { QuizHeadService } from '@app/features/show-time/quiz-head/quiz-head.service';
import { QuestionService } from '@app/features/show-time/question/question.service';
import { UserService } from '@app/features/user/services/user.service';
import { QuizService } from '../services/quiz.service';
import { LocalStorageService } from '@app/core/storage/local-storage.service';
import { ExtraLivesService } from '@app/features/user/extra-lifes/services/extra-lives.service';
import { LoggerService } from '@app/core/logger/logger.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit, OnDestroy, OnChanges {
  @Input() question: Question;
  answerSelected: boolean;
  isLastQuestion: boolean;
  stars: string[];
  countDown: number;
  showQuestion: boolean;
  yourAnswerId: number;
  extraLifeUsed: boolean;
  extraLivesCount: number;

  subscriptions: Subscription;
  areYouCorrect: string;
  result: string;
  noAnswerProvided: boolean;
  spentLife: boolean;
  report: AnswerReviewEvent;
  delay: number;

  private questionsSubscription: Subscription;
  private userAnswerAckSubscription: Subscription;
  private user: User;

  constructor(
    private quizService: QuizService,
    private quizHeadService: QuizHeadService,
    private stateService: StateService,
    private userService: UserService,
    private questionService: QuestionService,
    private extraLivesService: ExtraLivesService,
    private localStorageService: LocalStorageService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {
    this.answerSelected = false;
    this.isLastQuestion = false;
    this.trackUserInfo();
    this.subscribeQuestions();
    this.subscribeUserAckReport();

    // Mark the life if was used.
    if (this.extraLivesService.getExtraLifeUsed()) {
      this.extraLifeUsed = true;
    }
  }

  ngOnChanges() {
    this.onNewQuestion();
  }

  ngOnDestroy() {
    this.questionsSubscription.unsubscribe();
    this.userAnswerAckSubscription.unsubscribe();
  }

  subscribeQuestions(): void {
    this.questionsSubscription = this.stateService
      .getAnswerReviewEvent()
      .subscribe((report: AnswerReviewEvent) => {
        this.report = report;
        this.handleReport();
      });
  }

  trackUserInfo(): void {
    this.userService.user$.subscribe(data => {
      this.user = data;
      this.extraLivesCount = data.extraLives;
    });
  }

  subscribeUserAckReport() {
    this.userAnswerAckSubscription = this.stateService
    .getUserAnswerAckEvent()
    .subscribe((report: UserAnswerAckEvent) => {
      this.yourAnswerId = report.answerId;
      this.delay = report.delay;
    });
  }

  handleReport(): void {
    const timesOut = setTimeout(() => {
      clearTimeout(timesOut);
      const correct = ((this.report.answer.id === this.yourAnswerId)
      || (this.yourAnswerId === null && this.noAnswerProvided === false)) ? true : false;
      this.showQuestion = true;
      this.quizHeadService.setHeadClasses('go-down');
      this.result = correct ? 'Correcto' : 'Incorrecto';
      this.areYouCorrect = correct ? 'correct' : 'wrong';

      const usersAnswersCount = document.getElementsByClassName(
        'users-answers-count'
      );

      this.questionService
      .markAnswerAs(
        this.report.answer.id,
        this.yourAnswerId,
        this.report.answersStats
      )
      .then(data => {
        data.correctAnswer.classList.add('correct');
        if (
          this.yourAnswerId !== this.report.answer.id &&
          data.yourAnswer
        ) {
          data.yourAnswer.classList.add('wrong');
        }
        if (this.yourAnswerId === this.report.answer.id || this.spentLife) {
          this.loadStars(this.calculateStars(this.delay));
        }

        this.setDisplayStyleToCollection(usersAnswersCount, 'inline');

        const hideReportTimeOut = setTimeout(() => {
          clearTimeout(hideReportTimeOut);
          this.showQuestion = false;
          this.quizHeadService.setHeadClasses('');
          this.result = '';
          this.setDisplayStyleToCollection(usersAnswersCount, 'none');
        }, env.hideReportTime);
      })
      .catch((err: Error) => {
        this.loggerService.log('error', 'handleReport:' + JSON.stringify(err));
        // If any error ocurred.
        this.showQuestion = false;
        this.quizHeadService.setHeadClasses('');
        return;
      });
    }, this.question.waitingTime);
  }

  setDisplayStyleToCollection(
    collection: HTMLCollectionOf<Element>,
    style: string
  ): void {
    for (let i = 0; i < collection.length; i++) {
      (<HTMLElement>collection[i]).style.display = style;
    }
  }

  handleAnswer(answerId: number): void {
    if (this.report !== null) {
      return;
    }
    this.answerSelected = true;
    this.yourAnswerId = answerId;
    this.loggerService.log('info', 'Question handleAnswer ' + answerId);
    this.questionService.handleAnswer(answerId);
  }

  handleNoAnswer() {
    if (this.answerSelected === true) {
      return;
    }
    this.noAnswerProvided = true;
    this.loggerService.log('info', 'Question handleNoAnswer');
    // this.questionService.handleNoAnswer();
  }

  useExtraLife(): void {
    if (this.report !== null || this.answerSelected === true) {
      return;
    }
    this.extraLivesCount--;
    this.quizHeadService.setExtraLives(this.extraLivesCount);
    this.answerSelected = true;
    this.extraLifeUsed = true; // Global
    this.spentLife = true; // To let the 3 stars on comodin.
    this.localStorageService.setItem('elu', true);
    this.localStorageService.setItem('elc', this.extraLivesCount);
    this.yourAnswerId = null;
    this.loggerService.log('info', 'Question useExtraLife');
    this.questionService.useExtraLife();
  }

  loadStars(starsCount: number): void {
    this.stars = [];
    for (let index = 0; index < starsCount; index++) {
      this.stars.push('assets/images/icons/star.png');
    }
  }

  calculateStars(delay): number {
    let stars = 1;
    const time = 10000 - delay;

    const changeToTwoStars = 4000;
    const changeToOneStar = 2000;
    if (time > changeToTwoStars) {
      stars = 3;
    }
    if (time <= changeToTwoStars && time > changeToOneStar) {
      stars = 2;
    }
    if (this.spentLife) {
      stars = 3;
    }
    const spentLifeMessage = (this.spentLife) ? 'usedComodin:' : '';
    this.loggerService.log('info', 'Question calculateStars ' + time + ' seconds ' + stars + ' stars ' + spentLifeMessage
      + ' question ' + (this.question.index + 1));
    return stars;
  }

  decreaseCountDown(): void {
    const interval = setInterval(() => {
      this.countDown -= 1;
      // FIXME That stars "manager" !! inherit from V1
      if (this.countDown === 4) {
        this.stars[0] = 'assets/images/icons/disable-star.jpg';
      }

      if (this.countDown === 2) {
        this.stars[1] = 'assets/images/icons/disable-star.jpg';
      }

      if (this.countDown <= 0) {
        this.stars[2] = 'assets/images/icons/disable-star.jpg';

        // When count down is equal or less than 0 hide the question screen.
        this.quizHeadService.setHeadClasses('');
        this.quizHeadService.setLogo('assets/images/logo/qv-small-white.png');
        this.handleNoAnswer();
        clearInterval(interval);
        this.showQuestion = false;
      }
    }, 1000);
  }

  onNewQuestion(): void {
    this.isLastQuestion = false;
    this.quizService.quiz$.subscribe(data => {
      if (data.questionCount === ( this.question.index + 1 )) { // Questions index start by zero
        this.isLastQuestion = true;
      }
    });
    this.quizHeadService.setHeadClasses('go-down go-black');
    this.quizHeadService.setLogo('assets/images/logo/qv-small-blue.png');
    this.countDown = 10;
    this.spentLife = false;
    this.noAnswerProvided = false;
    this.answerSelected = false;
    this.showQuestion = true;
    this.report = null;
    this.areYouCorrect = null;
    this.loadStars(3);
    this.decreaseCountDown();
    this.loggerService.log('info', 'Question index ' + JSON.stringify(this.question));
  }
}
