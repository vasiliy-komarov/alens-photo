import {SwiperOptionsProvider} from '../../resources/elements/swiper';

export class Home {

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
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    roundLengths: true,
    slidesPerView: 1,
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
