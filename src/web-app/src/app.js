import {inject, LogManager} from 'aurelia-framework'

const log = LogManager.getLogger('app-js');

export class App {
  constructor() {
    this.message = 'Hello World!';
    log.info('Init app');
  }
}
