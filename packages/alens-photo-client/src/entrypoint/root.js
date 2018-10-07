import {PLATFORM} from 'aurelia-pal';

export class Root {

  configureRouter(config, router) {
    this.router = router;

    config.map([
      {
        route: ['', '*path']
        , name: 'app'
        , moduleId: PLATFORM.moduleName('./front')
      }, {
        route: 'dashboard'
        , name: 'dashboard'
        , moduleId: PLATFORM.moduleName('./dashboard')
      }
    ]);

    this.router = router;
  }
}
