import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment as env } from '@env/environment';
import { Subscription } from 'rxjs/Subscription';

import { Quiz, User } from '@app/domain';
import { StateService, AuthService } from '@app/core';

import { UserService } from '@app/features/user/services/user.service';
import { QuizService } from '@app/features/show-time/services/quiz.service';

import { Titled } from '@app/shared/head/titled';
import { Message } from '@app/shared/head/message'; // FIXME

import { Router } from '@angular/router';
import { TimerService } from '@app/core/timer/timer.service';
import { UserApiResponse, BaseResponse, QuizApiResponse } from '@app/shared/api';
import { LocalStorageService } from '@app/core/storage/local-storage.service';
import { UtilsService } from '@app/utils/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  image: string;
  titles: Titled[];
  subtitles: Titled[];
  population: number;
  messages: Message[];

  private timerEventSubscription: Subscription;
  private quizEventSubscription: Subscription;
  private userAPISubscription: Subscription;
  private referalSubscription: Subscription;
  private authServiceSubscription: Subscription;
  private nearestQuizSubscription: Subscription;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private stateService: StateService,
    private authService: AuthService,
    private quizService: QuizService,
    private utilsService: UtilsService,
    private timerService: TimerService,
    private router: Router
  ) {}

  ngOnInit() {

    this.titles = [new Titled('QV', 'logo logo-medium logo-white', 'logo')];

    // Default message
    this.messages = [
      new Message('Te esperamos cada día a las 21:30h CET', 'h4 white')
    ];

    // Connect if wasn't already connected
    this.stateService.connectGameServer();

    // Checks for a referral code
    this.checkForReferralCode();

    // Subscribe the next quiz api info
    this.subscribeNextQuizAPI();

    // Get the user data
    this.subscribeUserApi();

    // Listen the quiz service
    this.subscribeQuizEvent();

    // Shows a reminder
    this.utilsService.reminder();
    window.FirebasePlugin.setScreenName("Profile");
  }

  ngOnDestroy() {
    // Unsubscribe Event observables
    this.quizEventSubscription.unsubscribe();

    // Unsubscribe API observables
    this.nearestQuizSubscription.unsubscribe();

    // Unsubscribe time event
    if (this.timerEventSubscription != null) {
      this.timerEventSubscription.unsubscribe();
    }
  }

  /**
   * Subscribe to the API user data
   *
   * @memberof ProfileComponent
   */
  subscribeUserApi(): void {
    // Obtains the current user info the first time
    this.userAPISubscription = this.userService.reqProfileInfo().subscribe((res: UserApiResponse) => {
      if (res.success) {
        this.user = res.data.user;
        this.userAPISubscription.unsubscribe();
      }
    });
  }

  /**
   * Subscribes to the timer event
   *
   * @memberof ProfileComponent
   */
  subscribeTimerEvent(): void {

    // Prepare the default value since we start at 5 minutes left.
    const message = new Message('05:00', 'h4 white');

    this.timerEventSubscription = this.timerService.getTimer().subscribe((time: number) => {

      // 3 minutes before the big counter starts
      if (time < env.quizTimerStarts) {

        // It redirects to the big counter in /show-time
        this.router.navigate(['/show-time']);

      } else if (time < env.profileTimerStarts) {

        // But the profile countdown starts 5 minutes before
        const minutesString = this.utilsService.millisToMinutesAndSeconds(time);

        if (this.messages.length === 1) {
          this.messages.shift();
          this.messages.push(message);
        } else {
          this.messages = [message];
        }
        this.messages[0].text = minutesString;
      }
    });
  }

    /**
   *Subscribes the Quiz Event
   *
   * @memberof ProfileComponent
   */
  subscribeQuizEvent(): void {
    this.quizEventSubscription = this.quizService.quiz$.subscribe(data => {
      if (data != null) {
        if (Object.getOwnPropertyNames(data).length) {
          this.processQuizData(data);

          // Subscribes to the local Coutdown
          this.subscribeTimerEvent();
        }
      }
    });
  }

  subscribeNextQuizAPI(): void {
    this.nearestQuizSubscription = this.quizService.getNearestQuizApi().subscribe((res: QuizApiResponse) => {
      this.processQuizData(res.quiz);
    });
  }

  /**
   * Procces the quiz from the nearest quiz
   * @see getNearestQuiz
   * @see getQuizFound
   *
   * @param {Quiz} quiz
   * @returns
   * @memberof ProfileComponent
   */
  processQuizData(quiz: Quiz) {
    this.messages = [];
    this.subtitles = [
      new Titled('Próximo quiz', 'paragraph white', 'text')
    ];

    if (quiz == null) {

      this.subtitles = [];

      this.messages = [
        new Message('Te esperamos cada día a las 21:30h CET', 'h4 white')
      ];
      return;
    }

    let message;
    const result = this.quizService.processTheQuizDate(quiz.startTime);

    if (result.dayPrefix) {
      let minutes: number | string = result.quizDate.getMinutes();
      minutes = ('0' + minutes).slice(-2);

      message = new Message(`
        ${result.dayPrefix}, ${result.quizDate.getHours()}:${minutes}`,
        'h4 white'
      );
    } else {
      message = new Message(`
        ${result.quizDate.getDate()} ${result.month}`,
        'h4 white'
      );
    }

    if (quiz.prizeAmount > 0) {
      this.messages = [
        message,
        new Message(`Gana ${quiz.prizeAmount} EUR`, 'h4 white')
      ];
    } else {
      this.messages = [
        message,
        new Message(`Gana ${quiz.prizeString}`, 'h4 white')
      ];
    }
  }

    /**
   * Checks for Referral Code in the LocalStorage
   *
   * @memberof ProfileComponent
   */
  checkForReferralCode(): void {
    const referralId = this.localStorageService.getItem('referral_user_id');

    // Updates the user referal id if exists
    if (referralId) {
      this.referalSubscription = this.userService.updateUserReferral(referralId)
        .subscribe((res: BaseResponse) => {
          this.localStorageService.removeItem('referral_user_id');
          this.referalSubscription.unsubscribe();
        });
    }
  }

  logout(): void {
    this.authServiceSubscription = this.authService.logout().subscribe((res: any) => {
        if (!res.success) {

          // remove jwt from local storage
          this.localStorageService.removeItem('jwt');

          this.authService.setUserLoggedIn(false);
          this.stateService.setGameStarted(false);

          this.router.navigate(['/login']);
          this.authServiceSubscription.unsubscribe();
        }
    });
  }
}
