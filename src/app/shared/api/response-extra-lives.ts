import { WebSocketResponse } from '@app/shared/api';

export interface ExtraLivesEvent extends WebSocketResponse {
  data: {
    count: number
  };
}
