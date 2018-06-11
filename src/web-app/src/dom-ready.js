import {PLATFORM} from 'aurelia-pal';
import {LogManager} from 'aurelia-framework';

const log = LogManager.getLogger('dom-ready');

export function isDomReady() {
  return new Promise((resolve, reject) => {
    log.info('PLATFORM.global.document.readyState', PLATFORM.global.document.readyState)
    if (PLATFORM.global.document.readyState !== 'loading') {
      console.error('document is already ready, just execute code here');
      resolve();
    } else {
      PLATFORM.global.document.addEventListener('DOMContentLoaded', function () {
        console.error('document was not ready, place code here');
        resolve();
      });
    }
  });
}
