import environment from './environment';
import {LogManager} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {I18N, TCustomAttribute} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';
import 'materialize-css';
import {isDomReady} from './dom-ready';
import '../styles/main.scss';


const log = LogManager.getLogger("Main");
// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({warnings: {wForgottenReturn: false}});

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), b =>
       b.useAll()
//      b.useCarousel()
//        .useBox()
//        .useButton()
//        .useColors()
//        .useNavbar()
//        .useFooter()
//        .useSidenav()
//        .useWaves()
    )
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);

      // register backend plugin
      instance.i18next.use(Backend);
      instance.i18next.use(LngDetector);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        attributes: aliases,
        // lng : 'ru',
        fallbackLng : ['ru', 'en'],
        debug : environment.debug
      });
    })
    .feature(PLATFORM.moduleName('resources/index'));

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }
  await aurelia.start();
//  await aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('entrypoint/root')));

  await aurelia.setRoot(PLATFORM.moduleName('entrypoint/root'));
//  isDomReady().then(() => aurelia.setRoot(PLATFORM.moduleName('entrypoint/root'))).catch(e => log.error('Can\' init', e));
}
