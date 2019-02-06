import { MessageGameEvent } from '@app/core/socket';

export interface PopulationReportEvent extends MessageGameEvent {
  population: number;
}

export class PopulationReportEvent implements PopulationReportEvent {}
