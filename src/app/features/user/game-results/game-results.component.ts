import { Component, OnInit, OnDestroy } from '@angular/core';
import { Titled } from '@app/shared/head/titled';
import { Message } from '@app/shared/head/message';
import { UserService } from '@app/features/user/services/user.service';
import { User } from '@app/domain/user';
import { Subscription } from 'rxjs/Subscription';
import { QuizService } from '@app/features/show-time/services/quiz.service';
import { GameResultsResponse, UserApiResponse, QuizApiResponse } from '@app/shared/api';
import { Quiz } from '@app/domain';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html'
})
export class GameResultsComponent implements OnInit, OnDestroy {
  user: User;
  quiz: Quiz;
  image: string;
  titles: Titled[];
  subtitles: Titled[];
  messages: Message[];
  slides: any[];
  slideConfig: any;
  winners: any[];
  lastQuizId: number;
  showUserProfile: boolean;

  private quizSubscription: Subscription;
  private profileSubscription: Subscription;
  private winnersSubscription: Subscription;

  constructor(
    private userService: UserService,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    this.slides = [];
    this.winners = [];
    this.image = '';
    this.titles = [new Titled('Ganadores', 'h3 white', 'text')];
    this.messages = [];
    this.setUserData();
    this.latestQuizSubscribe();
    window.FirebasePlugin.setScreenName("Game result");
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
    this.winnersSubscription.unsubscribe();
    this.quizSubscription.unsubscribe();
  }

  setUserData(): void {
    this.profileSubscription = this.userService
      .reqResultInfo()
      .subscribe((res: UserApiResponse) => {
        if (!res.success) {
          return;
        }
        this.userService.getUser().subscribe(data => this.user = data);
      });
  }

  latestQuizSubscribe(): void {
    this.quizSubscription = this.quizService
      .getLatestQuizApi()
      .subscribe((res: QuizApiResponse) => {
        this.quiz = res.quiz;

        this.slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

        this.winnersSubscription = this.userService
          .getWinners(this.quiz.id)
          .subscribe((result: GameResultsResponse) => { // Move the getWinners to the quiz domain
            if (!result.success) {
              return;
            }
            this.winners = result.data.winners;

            let i = 0;
            this.showUserProfile = false;
            this.winners.forEach(winner => {
              if (winner.is_winner) {
                this.slides.push(winner);
              }
              if (this.user.id === winner.user_id) {
                this.showUserProfile = true;
              }

              i++;
              winner.position = i;
              winner.image =
                winner.image !== null
                  ? winner.image.replace(/http:/g, '')
                  : null;
            });
          });
      });
  }
  afterChange(e) {
    // afterChange
  }
}
