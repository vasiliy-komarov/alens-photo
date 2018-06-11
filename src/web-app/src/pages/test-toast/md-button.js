import { inject, LogManager } from 'aurelia-framework';
import { MdToastService } from 'aurelia-materialize-bridge/toast/toastService';

// const log = LogManager.getLogger('md-button')​

@inject(MdToastService)
export class MdButton {
  constructor(toast) {
    this.toast = toast;
  }

  showToast() {
    this.toast.show('You clicked me!', 2000);
  }
}
