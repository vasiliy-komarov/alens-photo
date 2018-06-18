import {PLATFORM} from 'aurelia-pal';

export class Front {

  configureRouter(config, router) {
    this.router = router;
    // config.title = 'Aurelia';

    config.map([
      {
        route: '', name: 'front-home', moduleId: PLATFORM.moduleName('pages/main-page/app'), nav: true
      }, {
        route: 'portfolio', name: 'front-portfolio', moduleId: PLATFORM.moduleName('pages/gallery-section/gallery-section'), nav: true
      }, {
        route: 'about', name: 'front-about', moduleId: PLATFORM.moduleName('pages/contacts/contacts'), nav: true
      }, {
        route: 'price', name: 'front-price', moduleId: PLATFORM.moduleName('pages/price/price'), nav: true
      }
    ]);

    this.router = router;
  }
}
