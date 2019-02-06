import { MessageGameEvent } from '@app/core/socket';

export interface UserAnswerAckEvent extends MessageGameEvent {
  answerId: number;
  delay: number;
  time: number;
}
