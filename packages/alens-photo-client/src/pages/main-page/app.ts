import {inject, TaskQueue, LogManager} from 'aurelia-framework';
import Swiper from "swiper";

const log = LogManager.getLogger('app-js');

@inject(TaskQueue)
export class App {
  taskQueue: TaskQueue;
  images: Array<Object>;
  swiperContainer: Element;
  btnNext: Element;
  btnPrev: Element;

  constructor(taskQueue: TaskQueue) {
    log.info('Init app');

    this.taskQueue = taskQueue;

    this.images = [
      {
        imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLbVhsNzdIYmlfN1E'
      }
      , {
        imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLWTdaX3J5b1VueDg'
      }
      , {
        imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLRml1b3B6eXVqQ2s'
      }
      , {
        imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLVUpEems2ZXpHYVk'
      }
      , {
        imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLNXBIcEdOUFVIWmM'
      }
    ];
  }

  attached() {
    this.taskQueue.queueMicroTask(() => {
      new Swiper(this.swiperContainer, {
        loop: true,
        speed: 500,
        // slidesPerView: 3,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        navigation: {
          nextEl: this.btnNext,
          prevEl: this.btnPrev
        }
      });
    });
  }
}
