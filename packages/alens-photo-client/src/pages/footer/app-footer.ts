export class AppFooter {
  name: String;
  phone: String;
  email: String;
  year: Number;

  constructor() {
    this.name = 'Alena Philippova';
    this.phone = '89001234567';
    this.email = 'test@com.ru';
    this.year = new Date().getFullYear();
  }
}
