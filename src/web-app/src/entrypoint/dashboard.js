import {PLATFORM} from 'aurelia-pal';

export class Dashboard {

  configureRouter(config, router) {
    this.router = router;
    // config.title = 'Aurelia';

    config.map([
      {
        route: '', name: 'main-dashboard', moduleId: PLATFORM.moduleName('pages/dashboard/front-dashboard/front'), nav: true
      }
    ]);

    this.router = router;
  }
}
