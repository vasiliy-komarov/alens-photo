import {bindable, TaskQueue, autoinject} from 'aurelia-framework';
import {DeferredPromise, promise} from '../../tools/promises';
import SwiperConstructor, {Swiper, SwiperOptions} from 'swiper';
import assign from 'lodash/assign';
import has from 'lodash/has';

export * from 'swiper';
export type SwiperOptionsProvider = (HtmlElement) => SwiperOptions

@autoinject
export class SwiperCustomElement {

  @bindable()
  private optionsProvider: SwiperOptionsProvider = () => ({});

  private swiperInstance: Swiper;
  private containerEl: HTMLElement;
  private swiperOptions: SwiperOptions;
  private bound: DeferredPromise<void> = promise();

  constructor(private taskQueue: TaskQueue) {
  }

  private get hasNextBtn(): boolean {
    return has(this.swiperOptions, 'navigation.nextEl');
  }

  private get hasPrevBtn(): boolean {
    return has(this.swiperOptions, 'navigation.prevEl');
  }

  private get hasPagination(): boolean {
    return has(this.swiperOptions, 'pagination');
  }

  public getSwiperInstance(): Promise<Swiper> {
    return this.bound.then(() => this.swiperInstance);
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
    this.bound.resolve();
  }

  attached() {
    // @ts-ignore
    this.taskQueue.queueTask(() => this.swiperInstance.init());
  }

  unbind() {
    this.swiperInstance.destroy(true, false);
    this.swiperInstance = null;
    this.swiperOptions = null;
    this.bound = null;
  }
}
