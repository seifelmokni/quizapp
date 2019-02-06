import { MessageGameEvent } from '@app/core/socket';

export interface CheatingAlertEvent extends MessageGameEvent {
  time: number;
}
