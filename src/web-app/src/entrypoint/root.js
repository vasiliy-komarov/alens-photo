import {PLATFORM} from 'aurelia-pal';

export class Root {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';

    config.map([
      {
        route: ['', 'home'], name: 'mainRoute', moduleId: PLATFORM.moduleName('pages/main-page/app'), nav: true
      },
      {
        route: 'nikitka', name: 'nikitkaRoute', moduleId: PLATFORM.moduleName('../pages/nikitka/nikitka'), nav: true
      },
      {
        route: 'contacts', name: 'Contacts', moduleId: PLATFORM.moduleName('../pages/contacts/contacts'), nav: true
      },
      {
        route: 'price', name: 'Price', moduleId: PLATFORM.moduleName('../pages/price/price'), nav: true
      }
    ]);

    this.router = router;
  }
}
