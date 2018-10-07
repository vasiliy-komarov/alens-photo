import {PLATFORM} from 'aurelia-pal';
import {RouterConfiguration, Router} from 'aurelia-router';

export class Dashboard {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.map([
      {
        route: '', name: 'main-dashboard', moduleId: PLATFORM.moduleName('pages/dashboard/dashboard'), nav: true
      }
    ]);

    this.router = router;
  }
}
