import {LogManager} from 'aurelia-framework';

const log = LogManager.getLogger('Nikitka');

export class Nikitka {
  constructor() {
    this.name = 'Никитка'
  };

  activate() {
    log.info('Activate');
  }
}
