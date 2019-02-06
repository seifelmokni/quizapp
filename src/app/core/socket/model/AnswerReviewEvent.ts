import { MessageGameEvent } from '@app/core/socket';
import { Answer } from '@app/domain';

export interface AnswerReviewEvent extends MessageGameEvent {
  time: number;
  duration: number;
  answer: Answer;
  answersStats: Object;
}
