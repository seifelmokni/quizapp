import { Quiz, Question } from '@app/domain';
import { MessageGameEvent } from '@app/core/socket';

export interface CurrentQuizEvent extends MessageGameEvent {
  timeToStart: number;
  quiz: Quiz;
  question: Question;
  time: number;
}
