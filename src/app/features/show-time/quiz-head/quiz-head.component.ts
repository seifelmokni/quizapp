import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { QuizHeadService } from '@app/features/show-time/quiz-head/quiz-head.service';
import { UserService } from '@app/features/user/services/user.service';
import { ExtraLivesService } from '@app/features/user/extra-lifes/services/extra-lives.service';
import { User } from '@app/domain';

@Component({
  selector: 'app-quiz-head',
  templateUrl: './quiz-head.component.html'
})
export class QuizHeadComponent implements OnInit, OnDestroy {
  usersCount: number;
  extraLives: number;
  headClasses: string;
  logo: string;
  extraLivesSub: Subscription;

  constructor(
    private quizHeadService: QuizHeadService,
    private userService: UserService,
    private extraLivesService: ExtraLivesService
  ) {}

  ngOnInit() {
    this.extraLives = this.getExtraLivesCount();
    this.quizHeadService.setHeadClasses = this.setHeadClasess.bind(this);
    this.quizHeadService.setLogo = this.setLogo.bind(this);
    this.quizHeadService.setUsersCount = this.setUsersCount.bind(this);
    this.quizHeadService.setExtraLives = this.setExtraLives.bind(this);
    this.logo = 'assets/images/logo/qv-small-white.png';
  }

  ngOnDestroy() {
    this.extraLivesSub.unsubscribe();
  }

  setHeadClasess(value: string): void {
    this.headClasses = value;
  }

  setLogo(value: string): void {
    this.logo = value;
  }

  setUsersCount(value: number): void {
    this.usersCount = value;
  }

  setExtraLives(value: number): void {
    this.extraLives = value;
  }

  getExtraLivesCount(): number {
    this.extraLives = 0;
    if (this.extraLivesService.getExtraLifeUsed()) {
      this.setExtraLives(this.extraLivesService.getCurrentLivesCount());
    } else {
      this.extraLivesSub = this.userService
      .user$
      .subscribe((data: User) => {
        this.setExtraLives(data.extraLives);
      });
    }
    return this.extraLives;
  }
}
