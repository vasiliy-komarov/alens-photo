import {Lazy, autoinject, lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject()
export class ApiService  {
  __httpClient: HttpClient;

  constructor(@lazy(true) client: HttpClient) {
    this.__httpClient = client;

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
