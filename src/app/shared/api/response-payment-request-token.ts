import { BaseResponse } from '@app/shared/api';

export interface PaymentRequestToken extends BaseResponse {
  data: {
    payment_request_token: string
  };
}
