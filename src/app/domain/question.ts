import { Answer } from './answer';

export interface Question {
  id: number;
  quizId: number;
  index: number;
  title: string;
  startTime: number;
  endTime: number;
  waitingTime: number;
  answers: Answer[];
}

export class Question implements Question {}
