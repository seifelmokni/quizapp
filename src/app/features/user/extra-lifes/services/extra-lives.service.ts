import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '@app/features/user/services/user.service';
import { LocalStorageService } from '@app/core/storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ExtraLivesService {
  private extraLivesCountSubject = new BehaviorSubject<number>(0);
  extraLives$ = this.extraLivesCountSubject.asObservable();

  // Local helpers
  private elu: boolean;
  private elc: number;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) {
    this.elu = this.localStorageService.getItem('elu');
    this.elc = this.localStorageService.getItem('elc');
  }

  public getExtraLifeUsed(): boolean {
    return this.elu;
  }

  public getCurrentLivesCount(): number {
    return this.elc;
  }

  public onExtraLivesCount() {
    if (this.elu) {
      this.setExtraLivesCount(this.elc);
    } else {
      this.userService.user$.subscribe (data => {
        this.setExtraLivesCount(data.extraLives);
      });
    }
  }

  public getExtraLivesCount(): Observable<number> {
    return this.extraLivesCountSubject.asObservable();
  }

  public setExtraLivesCount(count: number): void {
    this.extraLivesCountSubject.next(count);
  }
}
