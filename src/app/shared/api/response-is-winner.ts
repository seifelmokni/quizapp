import { BaseResponse } from '@app/shared/api';

export interface IsWinnerResponse extends BaseResponse {
  data: {
    score: number,
    money: number,
    isWinner: boolean,
    countOfWinners: number
  };
}
