import {PLATFORM} from 'aurelia-pal';
import {Router, RouterConfiguration} from 'aurelia-router';

export class Root {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.map([
      {
        route: ['']
        , name: 'front-home'
        , nav: true
        , viewPorts: {
          top: {
            moduleId: PLATFORM.moduleName('pages/header/header')
          }
          , main: {
            moduleId: PLATFORM.moduleName('pages/home/home')
          }
          , bottom: {
            moduleId: PLATFORM.moduleName('pages/footer/footer')
          }
        }
      }, {
        route: 'portfolio'
        , name: 'front-portfolio'
        , viewPorts: {
          top: {
            moduleId: PLATFORM.moduleName('pages/header/header')
          }
          , main: {
            moduleId: PLATFORM.moduleName('pages/portfolio/portfolio')
          }
          , bottom: {
            moduleId: PLATFORM.moduleName('pages/footer/footer')
          }
        }
        , nav: true
      }, {
        route: 'gallery/:id'
        , name: 'front-album'
        , viewPorts: {
          top: {
            moduleId: PLATFORM.moduleName('pages/header/header')
          }
          , main: {
            moduleId: PLATFORM.moduleName('pages/gallery/gallery')
          }
          , bottom: {
            moduleId: PLATFORM.moduleName('pages/footer/footer')
          }
        }
      }
      , {
        route: 'about'
        , name: 'front-about'
        , nav: true
        , viewPorts: {
          top: {
            moduleId: PLATFORM.moduleName('pages/header/header')
          }
          , main: {
            moduleId: PLATFORM.moduleName('pages/contacts/contacts')
          }
          , bottom: {
            moduleId: PLATFORM.moduleName('pages/footer/footer')
          }
        }
      }
      , {
        route: 'price'
        , name: 'front-price'
        , nav: true
        , viewPorts: {
          top: {
            moduleId: PLATFORM.moduleName('pages/header/header')
          }
          , main: {
            moduleId: PLATFORM.moduleName('pages/price/price')
          }
          , bottom: {
            moduleId: PLATFORM.moduleName('pages/footer/footer')
          }
        }
      }
      // {
      //   route: ['', '*path']
      //   , name: 'app'
      //   , moduleId: PLATFORM.moduleName('./front')
      // }
      , {
        route: 'dashboard'
        , name: 'dashboard'
        , viewPorts: {
          top: {
            moduleId: PLATFORM.moduleName('pages/dashboard/header/header')
          }
          , main: {
            moduleId: PLATFORM.moduleName('pages/dashboard/dashboard')
          }
          , bottom: {
            moduleId: PLATFORM.moduleName('pages/dashboard/footer/footer')
          }
        }
      }
    ]);

    this.router = router;
  }
}
