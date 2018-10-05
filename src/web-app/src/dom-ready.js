import {PLATFORM} from 'aurelia-pal';
import {LogManager} from 'aurelia-framework';

const log = LogManager.getLogger('dom-ready');

isDomReady().then(() => log.info('materialize')).catch(e => console.error(e));

export function isDomReady() {
  return new Promise((resolve, reject) => {
    log.info('PLATFORM.global.document.readyState', PLATFORM.global.document.readyState);
    if (document.readyState !== 'loading') {
      log.error('document is already ready, just execute code here');
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        log.error('document was not ready, place code here');
        resolve();
      });
    }
  });
}
