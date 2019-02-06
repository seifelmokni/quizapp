import { MessageGameEvent } from '@app/core/socket/model/MessageGameEvent';
import { Question, Answer } from '@app/domain';

export interface StateChangeEvent extends MessageGameEvent {
  state: string;
  duration: number;
  quizId: number;
  question: Question;
  answer: Answer;
  answersStats: any;
  time: number;
}

export class StateChangeEvent implements StateChangeEvent {}
