import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import {LogManager} from 'aurelia-framework';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';
import 'materialize-css';
import {isDomReady} from './dom-ready';
import '../styles/main.scss';
import './images/favicon.ico';

const log = LogManager.getLogger("Main");
// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), b => b.useAll())
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
  // aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('entrypoint/root')));

  isDomReady().then(() => aurelia.setRoot(PLATFORM.moduleName('entrypoint/root')))
    .catch(e => log.error('Can\' init', e));
}
