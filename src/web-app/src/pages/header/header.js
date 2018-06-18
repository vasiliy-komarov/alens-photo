import {TaskQueue, inject} from 'aurelia-framework';

@inject(TaskQueue)
export class Header {
  constructor(tq) {
    this.taskQueue = tq;
    this.sideNav;
  };

  test() {
    this.taskQueue.queueMicroTask(() => this.sideNav.close());
  }
}
