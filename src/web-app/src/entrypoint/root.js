import {PLATFORM} from 'aurelia-pal';

export class Root {

  configureRouter(config, router) {
    this.router = router;
    // config.title = 'Aurelia';

    config.map([
      {
        route: ''
        , redirect: 'home'
      }, {
        route: 'home'
        , name: 'home'
        , moduleId: PLATFORM.moduleName('./front')
        , nav: true
      }, {
        route: 'dashboard'
        , name: 'dashboard'
        , moduleId: PLATFORM.moduleName('./dashboard')
      }
    ]);

    this.router = router;
  }
}
