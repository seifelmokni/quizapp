import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { StateChangeEvent } from '@app/core/socket/model/StateChangeEvent';
import { PopulationReportEvent } from '@app/core/socket';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  constructor() { }

  // Observable
  private populationSubject = new BehaviorSubject<PopulationReportEvent>(new PopulationReportEvent());
  population$ = this.populationSubject.asObservable();

  /**
   * Updates the population number
   *
   * @param {number} population
   * @memberof PopulationService
   */
  public setPopulation(population: PopulationReportEvent): void {
    this.populationSubject.next(population);
  }

  /**
   * Listen the population changes
   *
   * @returns {Observable<number>}
   * @memberof PopulationService
   */
  public getPopulation(): Observable<PopulationReportEvent> {
    return this.populationSubject.asObservable();
  }
}

