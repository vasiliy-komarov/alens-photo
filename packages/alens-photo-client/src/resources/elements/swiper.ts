import {bindable} from 'aurelia-framework';
import SwiperConstructor, {Swiper, SwiperOptions} from 'swiper';
import assign from 'lodash/assign';
import has from 'lodash/has';

export type SwiperOptionsProvider = (HtmlElement) => SwiperOptions

export class SwiperCustomElement {

  @bindable()
  private optionsProvider: SwiperOptionsProvider = () => ({});

  private swiperInstance: Swiper;
  private containerEl: HTMLElement;
  private swiperOptions: SwiperOptions;

  private get hasNextBtn(): boolean {
    return has(this.swiperOptions, 'navigation.nextEl');
  }

  private get hasPrevBtn(): boolean {
    return has(this.swiperOptions, 'navigation.prevEl');
  }

  private get hasPagination(): boolean {
    return has(this.swiperOptions, 'pagination');
  }

  public getSwiperInstance(): Swiper {
    return this.swiperInstance;
  }

  bind() {
    this.swiperOptions = assign(
      this.optionsProvider(this.containerEl),
      <SwiperOptions> {
        init: false
      }
    );
    // @ts-ignore
    this.swiperInstance = new SwiperConstructor(this.containerEl, this.swiperOptions);
  }

  attached() {
    // @ts-ignore
    this.swiperInstance.init();
  }

  unbind() {
    this.swiperInstance.destroy(true, false);
    this.swiperInstance = null;
    this.swiperOptions = null;
  }
}
