import { HeadBase } from './head-base';

export class Titled extends HeadBase {
  type: string;

  constructor(text: string, classes: string, type: string) {
    super(text, classes);
    this.type = type;
  }
}

