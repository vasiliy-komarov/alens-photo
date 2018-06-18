import {LogManager} from 'aurelia-framework';

const log = LogManager.getLogger('app-js');

export class App {
  constructor() {
    log.info('Init app');
  }
}
