import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { environment as env } from '@env/environment';

import { QuizHeadService } from '@app/features/show-time/quiz-head/quiz-head.service';
import { ShowTimeService } from '@app/features/show-time/show-time.service';
import { ExtraLivesService } from '@app/features/user/extra-lifes/services/extra-lives.service';

import { Question, Quiz } from '@app/domain';
import { StateService } from '@app/core';

import { TimerService } from '@app/core/timer/timer.service';
import { UtilsService } from '@app/utils/utils.service';
import { QuizService } from '@app/features/show-time/services/quiz.service';
import { PopulationService } from '@app/core/population/population.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit, OnDestroy {
  videoUrl: string;
  backgroundImageUrl: string;
  play: boolean;
  time: string;
  quiz: Quiz;
  population: number;
  showCounter: boolean;
  showButton: boolean;
  startVideoFrom: number;
  question: Question;

  private timerEventSubscription: Subscription;
  private questionEventSubscription: Subscription;
  private timer: number;

  constructor(
    private quizService: QuizService,
    private stateService: StateService,
    private showTimeService: ShowTimeService,
    private timerService: TimerService,
    private populationService: PopulationService,
    private quizHeadService: QuizHeadService,
    private extraLivesService: ExtraLivesService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit() {

    this.play = false;
    this.showCounter = true;
    this.backgroundImageUrl = this.showTimeService.getBgImage();

    // Connect if wasn't already connected
    this.stateService.connectGameServer();

    // It shows the players count
    this.onPopulationEvent();

    // Gets the Quiz Event Video Url
    this.getQuizVideoUrl();

    // Subscribe the timer events
    this.subscribeTimerEvent();

    // Extra Lives Count
    this.extraLivesService.onExtraLivesCount();
    window.FirebasePlugin.setScreenName("Quiz");
  }

  ngOnDestroy() {

    // Closing question subcriptions
    if (this.questionEventSubscription) {
      this.questionEventSubscription.unsubscribe();
    }

    // Closing timer events subscriptions
    if (this.timerEventSubscription) {
      this.timerEventSubscription.unsubscribe();
    }
  }

  /**
   * Gets just the current video url value
   *
   * @memberof QuizComponent
   */
  getQuizVideoUrl(): void {
    this.quizService.quiz$
    .subscribe(data => this.videoUrl = data.videoUrl + '?scr=qvapp');
  }

  /**
   * Gets the current population value
   *
   * @memberof QuizComponent
   */
  onPopulationEvent(): void {
    this.populationService.population$.subscribe(report => {
      this.quizHeadService.setUsersCount(report.population);
      this.population = report.population || 0;
      // this.startVideoFrom = this.timer || 0; // TESTING
    });
  }

  /**
   * Helper for a User interface button
   *
   * @memberof QuizComponent
   */
  joinNow(): void {
    this.play = true;
    this.showCounter = false;
    this.subscribeNextQuestion();
    setTimeout(() => {
      this.startVideoFrom = this.timer || 0;
      // Hls.js starts at 500ms so we need sync after that.
    }, env.initialSyncTime);
  }

  /**
   * Subscribe the Timer Event
   *
   * @memberof QuizComponent
   */
  subscribeTimerEvent(): void {
    let videoStarted = false;
    this.timerEventSubscription = this.timerService.getTimer().subscribe((time: number) => {
      this.timer = Math.abs(time);
      this.time = this.utilsService.millisToMinutesAndSeconds(time);

      if (time <= env.showButtonTimerStarts) {
        this.showCounter = false;
        this.showButton = true;
        if (!videoStarted) {
          videoStarted = true;
          this.startVideoFrom = this.timer || 0;
        }
      }
    });
  }

  /**
   * Listen the next question
   *
   * @memberof QuizComponent
   */
  subscribeNextQuestion(): void {
    this.questionEventSubscription = this.quizService.getQuestion().subscribe((question: Question) => {
      this.question = question;
      // Makes it starts again from the question startTime
      this.startVideoFrom = question.startTime;
    });
  }
}
