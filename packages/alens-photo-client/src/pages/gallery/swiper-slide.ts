import {inject, TaskQueue, LogManager} from 'aurelia-framework';
import SwModule from 'swiper';

const log = LogManager.getLogger('Swiper-slide');

@inject(TaskQueue)
export class SwiperSlide {
  tq: TaskQueue;
  images: Array<Object>;

  constructor(tq: TaskQueue) {
    this.tq = tq;
    this.images = [
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
  }

  bind() {
  }

  attached() {
    log.info('Attached swiper-slide', new Date());
    this.tq.queueMicroTask(() => {
      // Params
      let mainSliderSelector = '.main-slider',
        navSliderSelector = '.nav-slider',
        interleaveOffset = 0.5;

// Main Slider
      let mainSliderOptions = {
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
          init: function () {
            this.autoplay.stop();
          },
          imagesReady: function () {
            this.el.classList.remove('loading');
            this.autoplay.start();
          },
          slideChangeTransitionEnd: function () {
            let swiper = this,
              captions = swiper.el.querySelectorAll('.caption');
            for (let i = 0; i < captions.length; ++i) {
              captions[i].classList.remove('show');
            }
            swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
          },
          progress: function () {
            // log.info('Progress, date => ', new Date());
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;
              swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                "translate3d(" + innerTranslate + "px, 0, 0)";
            }
          },
          touchStart: function () {
            // log.info('Touch start, date => ', new Date());
            let swiper = this;
            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = "";
            }
          },
          setTransition: function (speed) {
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
      };
      let mainSlider = new SwModule.Swiper(mainSliderSelector, <SwModule.SwiperOptions>mainSliderOptions);

// Navigation Slider
      let navSliderOptions = {
        // loop: false,
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
          imagesReady: function () {
            this.el.classList.remove('loading');
          },
          click: function () {
            mainSlider.autoplay.stop();
          }
        }
      };
      let navSlider = new SwModule.Swiper(navSliderSelector, <SwModule.SwiperOptions>navSliderOptions);
// Matching sliders
      mainSlider.controller.control = navSlider;
      navSlider.controller.control = mainSlider;
    });
  }
}

