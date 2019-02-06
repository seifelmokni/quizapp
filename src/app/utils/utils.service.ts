import { Injectable } from '@angular/core';
declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  /**
   * Convert millis to Minutes and Seconds
   *
   * @param {*} millis
   * @returns {string}
   * @memberof UtilsService
   */
  public millisToMinutesAndSeconds(millis): string {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number.parseInt(((millis % 60000) / 1000).toFixed(0), 10);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  /**
   * Delay helper
   *
   * @param {number} ms
   * @returns
   * @memberof UtilsService
   */
  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /**
   * Static reminder
   *
   * @memberof UtilsService
   */
  public reminder() {
    const oDate = new Date(),
    locale = 'es-es',
    month = oDate.toLocaleString(locale, { month: 'short' });
    const currentCalendarDate = month + ' ' + oDate.getDate().toString() + ', ' + oDate.getFullYear().toString();
    $('.reminder > .btn').addcalevent({
      'data': {
        'title': '¡Quizvideo está a punto de empezar!',
        'desc': 'Quedan pocos minutos para el quizvideo de hoy. Date prisa si quieres conseguir 100 euros.',
        'location': 'QuizVideo.com',
        'url': 'https://quizvideo.com',
        'time': {
          'start': currentCalendarDate + ' 21:25:00',
          'end': currentCalendarDate + ' 21:45:00',
          'zone': '+01:00',
          'allday': 'false'
        },
      },
      onclick: true,
      apps: [1],
      ics: '',
      preVal: false,
      disabledClass: 'dis',
      linkText: [
        'Añadir Google'
      ]
    });
  }
}
