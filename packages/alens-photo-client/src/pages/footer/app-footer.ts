import {Router} from 'aurelia-router';
export class AppFooter {
  name: String;
  phone: String;
  email: String;
  year: Number;
  router: Router;

  constructor(router: Router) {
    this.name = 'Alena Philippova';
    this.phone = '89001234567';
    this.email = 'test@com.ru';
    this.year = new Date().getFullYear();
    this.router = router;
  }
}
