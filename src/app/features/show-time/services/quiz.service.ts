import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { Quiz, Question } from '@app/domain';
import { QuizApiResponse } from '@app/shared/api';
import { BehaviorSubject, Subject } from 'rxjs';

interface ProccessQuizDateResult {
  dayPrefix: string;
  quizDate: Date;
  month: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  // The current quiz
  private quizSubject = new BehaviorSubject<Quiz>(null);
  quiz$ = this.quizSubject.asObservable();

  // The UI info quiz, without the sensible info
  private nextQuizSubject = new BehaviorSubject<Quiz>(null);
  nextQuiz$ = this.nextQuizSubject.asObservable();

  // A quiz has a current question if available
  private questionSubject = new Subject<Question>();

  private latestQuizId: number;

  constructor(
    private https: HttpClient
  ) {}

  public getNearestQuizApi(): Observable<QuizApiResponse> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.https
      .get<QuizApiResponse>(
        `${env.apiUrl}/api/quiz`,
        httpOptions
      )
      .map((res: QuizApiResponse) => {
      if (res.success) {
        this.nextQuizSubject.next(res.quiz);
      }
      return res;
    });
  }

  public getLatestQuizApi(): Observable<QuizApiResponse> {
    const httpOptions = {
      withCredentials: true,
    };
    return this.https
      .get<QuizApiResponse>(
        `${env.apiUrl}/api/latest`,
        httpOptions
      )
      .map((res: QuizApiResponse) => {
        if (res.success === true) {
          this.latestQuizId = res.quiz.id;
        }
        return res;
      });
  }

  public setLatestQuizPlayed(id): void {
    this.latestQuizId = id;
  }

  public getLatestQuizPlayed(): number {
    return this.latestQuizId;
  }

  public processTheQuizDate(startTime): ProccessQuizDateResult {
    let dayPrefix: string = null;
      const months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const currentDate: Date = new Date();
      const quizDate: Date = new Date(startTime);

      const comparableCurrentDate = {
        currentDayDate: currentDate.getDate(),
        currentMonth: currentDate.getMonth()
      };

      const comparableQuizDate = {
        currentDayDate: quizDate.getDate(),
        currentMonth: quizDate.getMonth()
      };

      if (
        (comparableCurrentDate.currentDayDate === comparableQuizDate.currentDayDate) &&
        (comparableCurrentDate.currentMonth === comparableQuizDate.currentMonth)
      ) {
        dayPrefix = 'HOY';
      }

      if (
        (comparableCurrentDate.currentDayDate + 1 === comparableQuizDate.currentDayDate) &&
        (comparableCurrentDate.currentMonth === comparableQuizDate.currentMonth)
      ) {
        dayPrefix = 'MAÑANA';
      }

      const result: ProccessQuizDateResult = {
        dayPrefix,
        quizDate,
        month: months[quizDate.getMonth()]
      };

      return result;
  }

  public setQuiz(quiz: Quiz): void {
    this.quizSubject.next(quiz);
  }

  /**
   * Listen the quiz changes
   *
   * @returns {Observable<Quiz>}
   * @memberof QuizService
   */
  public getQuiz(): Observable<{}> {
    return this.quizSubject.asObservable();
  }

  /**
   * Listen the question changes
   *
   * @returns {Observable<Question>}
   * @memberof StateService
   */
  public getQuestion(): Observable<Question> {
    return this.questionSubject.asObservable();
  }

  /**
   * Sets the current question
   *
   * @param {*} message
   * @memberof StateService
   */
  public setQuestion(question: Question): void {
    this.questionSubject.next(question);
  }
}
