import { User } from '@app/domain';
import { BaseResponse } from '@app/shared/api/response-base';


export interface UserApiResponse extends BaseResponse {
  data: {
    user: User;
  };
}
