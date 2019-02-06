export interface Answer {
  id: number;
  text: string;
  questionId: number;
  isCorrect: boolean;
}

export interface AnswerToSend {
  answerId: number;
  useLife: boolean;
}
