import {PLATFORM} from 'aurelia-pal';

export class Root {

  configureRouter(config, router) {
    this.router = router;
    // config.title = 'Aurelia';

    config.map([
//      {
//        route: ''
//        , redirect: 'home'
//      }
      {
        route: ['', '*path']
        , name: 'home'
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
