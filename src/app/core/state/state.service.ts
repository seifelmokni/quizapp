import { Injectable } from '@angular/core';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';

import { SocketService } from '@app/core/socket/socket.service';
import { Msg } from '@app/core/state/model/MessageEnum';
import { StateChangeEvent } from '@app/core/socket/model/StateChangeEvent';
import { State } from '@app/core/state/model/StateEnum';
import { AuthService } from '@app/core/auth/auth.service';
import { LocalStorageService } from '@app/core/storage/local-storage.service';
import { UserAnswerAckEvent, AnswerReviewEvent } from '@app/core/socket';
import { JwtTokenResponse } from '@app/shared/api';
import { AnswerToSend } from '@app/domain';
import { FlashMessagesService } from '@app/shared';
import { Router } from '@angular/router';
import { TimerService } from '@app/core/timer/timer.service';
import { QuizService } from '@app/features/show-time/services/quiz.service';
import { PopulationService } from '@app/core/population/population.service';
import { LoggerService } from '../logger/logger.service';

/**
 * Game State Service
 *
 * @export
 * @class StateService
 */
@Injectable({
  providedIn: 'root'
})
export class StateService {

  // State Observable
  private stateSubject = new BehaviorSubject<StateChangeEvent>(new StateChangeEvent());
  state$ = this.stateSubject.asObservable();

  // Game started state observable
  private gameStartedSubject = new Subject<boolean>();

  // No way to cheat. Shows an alert
  private cheatingSubject = new Subject<boolean>();

  // A question can have an answer (or not)
  private answerReviewSubject = new Subject<AnswerReviewEvent>();

  // User Acknowledge event
  private userAnswerAckSubject = new Subject<UserAnswerAckEvent>();

  // Subscription to sendGameServerAuth
  private gameServerAuthSubscription: Subscription;

  // Subscription to the Socket Message Events
  private socketMessageSubscription: Subscription;

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private quizService: QuizService,
    private timerService: TimerService,
    private populationService: PopulationService,
    private localStorageService: LocalStorageService,
    private flashMessageService: FlashMessagesService,
    private Service: LoggerService,
    private router: Router
  ) {}

  /**
   * Initiates the socketService subscriptions
   * @memberof StateService
   */
  public init() {
    if (this.socketService.connect()) {
      this.onSubscribeMessage();
    }
  }

  /**
   * Destroy the socketService subscriptions on game End
   * @memberof StateService
   */
  public destroy() {
    this.socketMessageSubscription.unsubscribe();
    this.socketService.disconnect();
  }

  /**
   * Game Server Message subscriber
   * @returns {*}
   * @memberof StateService
   */
  public onSubscribeMessage(): void {
    // On subscribe the game_server send the auth
    this.gameServerAuthSubscription = this.authService.jwt().subscribe((message: JwtTokenResponse) => {
      this.localStorageService.setItem('jwt', message.token);
      this.socketService.sendAuth(this.localStorageService.getItem('jwt'));
      this.gameServerAuthSubscription.unsubscribe();
    });
    // And starts receiving messages
    this.socketMessageSubscription = this.socketService.onMessage().subscribe((message: any) => {
      this.handleMessage(message);
    });
  }

  /**
   * Connects the gameserver if was not already connected
   *
   * @memberof StateService
   */
  public connectGameServer(): void {
    if (!this.isConnected()) {
      this.init();
    }
  }

  /**
   * Socket is connected
   *
   * @returns {boolean}
   * @memberof StateService
   */
  public isConnected(): boolean {
    return this.socketService.isConnected();
  }

  /**
   * Listen the state changes
   *
   * @returns {Observable<StateChangeEvent>}
   * @memberof StateService
   */
  public getState(): Observable<StateChangeEvent> {
    return this.stateSubject.asObservable();
  }

  /**
   * Listen the started game event
   *
   * @returns {Observable<boolean>}
   * @memberof StateService
   */
  public getGameStarted(): Observable<boolean> {
    return this.gameStartedSubject.asObservable();
  }

  /**
   * Send the Answer
   *
   * @param {AnswerToSend} answer
   * @memberof StateService
   */
  public sendAnswer(answer: AnswerToSend): void {
    this.socketService.sendAnswer(answer.answerId, answer.useLife);
  }

  /**
   * Serializes the game state in a common object instead
   * serializing in different objects. It will be improved in the future.
   *
   * @param {*} message
   * @memberof StateService
   */
  public setState(message: any): void {
    const res: StateChangeEvent = {
      type: message.type,
      time:  message.time || null,
      state: message.state,
      duration: message.duration || null,
      quizId: message.quizId || null,
      question: message.question || null,
      answer: message.answer || null,
      answersStats: message.answersStats || null
    };
    this.handleState(res);
    this.stateSubject.next(res);
  }

  /**
   * Listen the cheating alerts
   *
   * @param {*} message
   * @memberof StateService
   */
  public setCheatingAlert(message: any): void {
    this.cheatingSubject.next(message);
  }

  /**
   * Updates the game_server started state
   *
   * @param {*} message
   * @memberof StateService
   */
  public setGameStarted(started: boolean): void {
    this.gameStartedSubject.next(started);
  }

  /**
   * Handle the Answer Review Event
   *
   * @returns {Observable<AnswerReviewEvent>}
   * @memberof StateService
   */
  public getAnswerReviewEvent(): Observable<AnswerReviewEvent> {
    return this.answerReviewSubject.asObservable();
  }

  /**
   * Handle the Answer Review Event
   *
   * @returns {Observable<AnswerReviewEvent>}
   * @memberof StateService
   */
  public setAnswerReviewEvent(answer: AnswerReviewEvent): void {
    this.answerReviewSubject.next(answer);
  }

  /**
   * Handle the User Answer Acknowledge Event
   *
   * @returns {Observable<UserAnswerAckEvent>}
   * @memberof StateService
   */
  public getUserAnswerAckEvent(): Observable<UserAnswerAckEvent> {
    return this.userAnswerAckSubject.asObservable();
  }

  /**
   * Set the Answer Ack Event
   *
   * @param {UserAnswerAckEvent} ack
   * @memberof StateService
   */
  public setUserAnswerAckEvent(ack: UserAnswerAckEvent): void {
    this.userAnswerAckSubject.next(ack);
  }

  /**
   * Handle the received message
   *
   * @param {*} message
   * @returns {void}
   * @memberof StateService
   */
  public handleMessage(message: any): void {
    switch (message.type) {
      case Msg.STATE_CHANGE:
        this.setState(message);
        break;
      case Msg.CURRENT_QUIZ:
        this.quizService.setQuiz(message.quiz);
        this.timerService.startTimer(message.quiz.startTime);
        break;
      case Msg.NO_CURRENT_QUIZ:
        this.quizService.setQuiz(null);
        this.timerService.stopTimer();
        break;
      case Msg.USER_ANSWER_ACK:
        this.setUserAnswerAckEvent(message);
        break;
      case Msg.DUPLICATED_USER_ANSWER:
        this.Service.log('info', 'StateService:handleMessage:DUPLICATED_USER_ANSWER' + message);
        // this.flashMessageService.sendMessage('No esta permitido responder dos veces con la misma cuenta.');
        // this.authService.logout();
        break;
      case Msg.POPULATION_REPORT:
        this.populationService.setPopulation(message);
        break;
      case Msg.CHEATING_ALERT:
        this.Service.log('info', 'StateService:handleMessage:CHEATING_ALERT' + message);
        // this.flashMessageService.sendMessage('El sistema nos notifica una alerta, puede que algo haya ido mal.');
        // this.authService.logout();
        break;
    }
  }

  /**
   * Handle the received state
   * FIXME Remove logs, then rewrite to minimalize the cases
   * I want to see the logs just now.
   *
   * Rewrite when tests done
   *
   * @param {any} message
   * @memberof StateService
   */
  public handleState(message: any) {
    switch (message.state) {
      case State.STANDBY:
      case State.READY:
        this.setGameStarted(false);
        break;
      case State.INTRO:
        this.setGameStarted(true);
        break;
      case State.QUESTION:
        this.setGameStarted(true);
        this.quizService.setQuestion(message.question);
        break;
      case State.ANSWER_REVIEW:
        this.setGameStarted(true);
        this.setAnswerReviewEvent(message);
        break;
      case State.OUTRO:
        // FIXME Remove the local items
        this.localStorageService.removeItem('elu');
        this.localStorageService.removeItem('elc');
        break;
      case State.FINISH:
        this.timerService.stopTimer();
        setTimeout(() => {
          this.setGameStarted(false);
          this.router.navigate(['/final']);
        }, 3000);
        break;
    }
  }

}
