import {PLATFORM} from 'aurelia-pal';
import {RouterConfiguration, Router} from 'aurelia-router';

export class Root {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.map([
      {
        route: ['', '*path']
        , name: 'app'
        , moduleId: PLATFORM.moduleName('./front')
      }
      , {
        route: 'dashboard'
        , name: 'dashboard'
        , moduleId: PLATFORM.moduleName('./dashboard')
      }
    ]);

    this.router = router;
  }
}
