import {autoinject, LogManager} from 'aurelia-framework';
import {Swiper, SwiperCustomElement, SwiperOptionsProvider} from "../../resources/elements/swiper";

const log = LogManager.getLogger('Swiper-slide');

@autoinject
export class SwiperSlide {

  private images: Array<Object> = [
    {
      title: 'Shaun Matthews',
      caption: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLbVhsNzdIYmlfN1E'
    }
    , {
      title: 'Alexis Berry',
      caption: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLWTdaX3J5b1VueDg'
    }
    , {
      title: 'Billie  Pierce',
      caption: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLRml1b3B6eXVqQ2s'
    }
    , {
      title: 'Trevor  Copeland',
      caption: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLVUpEems2ZXpHYVk'
    }
    , {
      title: 'Bernadette  Newman',
      caption: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      imageSrc: 'https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLNXBIcEdOUFVIWmM'
    }
  ];

  private mainSwiperElement: SwiperCustomElement;
  private navSwiperElement: SwiperCustomElement;
  private mainSwiper: Swiper;
  private navSwiper: Swiper;

  private mainSwiperOptionsProvider: SwiperOptionsProvider = () => ({
    loop: true,
    // loop: false,
    speed: 1000,
    autoplay: {
      delay: 5000
    },
    loopAdditionalSlides: 10,
    grabCursor: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init() {
        this.autoplay.stop();
      },
      imagesReady() {
        this.el.classList.remove('loading');
        this.autoplay.start();
      },
      slideChangeTransitionEnd() {
        let swiper = this,
          captions = swiper.el.querySelectorAll('.caption');
        for (let i = 0; i < captions.length; ++i) {
          captions[i].classList.remove('show');
        }
        swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
      },
      progress() {
        // log.info('Progress, date => ', new Date());
        let swiper = this;
        const interleaveOffset = 0.5;

        for (let i = 0; i < swiper.slides.length; i++) {
          let slideProgress = swiper.slides[i].progress,
            innerOffset = swiper.width * interleaveOffset,
            innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-bgimg").style.transform =
            "translate3d(" + innerTranslate + "px, 0, 0)";
        }
      },
      touchStart() {
        // log.info('Touch start, date => ', new Date());
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      // @ts-ignore
      setTransition(speed) {
        // log.info('Set transition, date => {}, speed => {}', new Date(), speed);
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          log.info('Slider transition = ', swiper.slides[i]);
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-bgimg").style.transition =
            speed + "ms";
        }
      }
    }
  });

  private navSwiperOptionsProvider: SwiperOptionsProvider = () => ({
    autoplay: {
      delay: 5000
    },
    loop: true,
    loopAdditionalSlides: 10,
    speed: 1000,
    spaceBetween: 5,
    slidesPerView: 5,
    centeredSlides: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    direction: 'vertical',
    on: {
      imagesReady() {
        this.el.classList.remove('loading');
      },
      click: () => {
        this.mainSwiper.autoplay.stop();
      }
    }
  });

  bind() {
    Promise.all([
      this.mainSwiperElement.getSwiperInstance(),
      this.navSwiperElement.getSwiperInstance()
    ]).then(([mainSwiper, navSwiper]) => {
      mainSwiper.controller.control = this.navSwiper = navSwiper;
      navSwiper.controller.control = this.mainSwiper = mainSwiper;
    });
  }

  unbind() {
    this.mainSwiper = this.navSwiper = null;
  }
}
