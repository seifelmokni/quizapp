import { Quiz } from '@app/domain';
import { BaseResponse } from '@app/shared/api';

export interface QuizApiResponse extends BaseResponse {
  quiz: Quiz;
}
