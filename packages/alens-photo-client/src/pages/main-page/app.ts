import {LogManager} from 'aurelia-framework';
import {SwiperOptionsProvider} from '../../resources/elements/swiper';

const log = LogManager.getLogger('app-js');

export class App {

  private images: Array<Object> = [
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

  private swiperOptionsProvider: SwiperOptionsProvider = () => ({
    loop: true,
    speed: 500,
    autoHeight: true,
    roundLengths: true,
    preloadImages: true,
    updateOnImagesReady: true,
    // slidesPerView: 3,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
}
