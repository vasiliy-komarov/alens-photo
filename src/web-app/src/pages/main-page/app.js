import {inject, LogManager} from 'aurelia-framework';
import {ApiService} from '../../services/api-service';

const log = LogManager.getLogger('app-js');

@inject(ApiService)
export class App {
  constructor(api) {
    this.message = 'Hello World!';
    log.info('Init app');
    this.__api = api;
  }

  testCall() {
    this.__api.test().then(r => r.json()).then(r => log.info('Response', r)).catch(e => log.error(e));
  };
}
