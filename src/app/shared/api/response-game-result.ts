import { BaseResponse } from '@app/shared/api';

export interface GameResultsResponse extends BaseResponse {
  data: {
    winners?: any; // GameResult;
  };
}
