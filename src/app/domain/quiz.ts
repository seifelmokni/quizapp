import { Question } from '@app/domain/question';

export interface Quiz {
  id: number;
  startTime: number;
  duration: number;
  prizeAmount: number;
  prizeString: string;
  questionCount: number;
  videoUrl: string;
}

export class Quiz implements Quiz {}
