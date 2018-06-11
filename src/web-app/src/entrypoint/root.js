import {PLATFORM} from 'aurelia-pal';

export class Root {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';

    config.map([
      { route: ['', 'home'], name: 'mainRoute', moduleId: PLATFORM.moduleName('app'), nav: false },
      { route: 'nikitka', name: 'nikitkaRoute', moduleId: PLATFORM.moduleName('../pages/nikitka/nikitka'), nav: true },
    ]);

    this.router = router;
  }
}
