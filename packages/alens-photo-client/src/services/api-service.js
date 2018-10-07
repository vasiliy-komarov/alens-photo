import {Lazy, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class ApiService {
  constructor(client) {
    this.__httpClient = client();

    this.__httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('/');
    });
  }

  test() {
    return this.__httpClient.fetch('api');
  }
}
