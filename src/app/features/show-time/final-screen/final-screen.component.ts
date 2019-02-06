import { Component, OnInit, OnDestroy } from '@angular/core';
import { Titled } from '@app/shared/head/titled';
import { IsWinnerResponse } from '@app/shared/api';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '@app/domain';
import { QuizService } from '@app/features/show-time/services/quiz.service';
import { LocalStorageService } from '@app/core/storage/local-storage.service';

@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html'
})
export class FinalScreenComponent implements OnInit {
  titles: Titled[];
  isWinner: boolean;
  countOfWinners: number;
  score: number;
  money: number;
  backgroundImage: string;
  message: string;
  quiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.titles = [new Titled('QV', 'logo logo-medium logo-white', 'logo')];
    this.quizService.quiz$.subscribe(data => this.quiz = data );

    this.route.data.subscribe((res: { isWinner: IsWinnerResponse }) => {
      if (res.isWinner.data) {
        this.setIsWinner(res.isWinner.data.isWinner);
        this.setScore(res.isWinner.data.score || 0);
        this.setMoney(res.isWinner.data.money || 0);
        this.setCountOfWinners(res.isWinner.data.countOfWinners);
        this.generateMessage();
      }
    });
    window.FirebasePlugin.setScreenName("Result Screen ");
  }

  setIsWinner(isWinner: boolean): void {
    this.isWinner = isWinner;
  }

  setScore(value: number): void {
    this.score = value;
  }

  setMoney(value: number): void {
    this.money = value;
  }

  setCountOfWinners(countOfWinners: number): void {
    this.countOfWinners = countOfWinners;
  }

  generateMessage(): void {
    if (this.isWinner === false || this.score === 0) { // For testing purposes when no results.
      this.message = 'Invita amigos para mejorar tu resultado'; // Invite your friends to make your chances bigger
      return;
    }

    if (this.countOfWinners === 1) {
      this.message = '¡Guau! Eres el único ganador';
      return;
    }

    this.message = `Eres uno de los ${this.countOfWinners} ganadores`;
  }
}
