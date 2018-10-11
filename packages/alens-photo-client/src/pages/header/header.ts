import {Router} from 'aurelia-router';
import {MdSidenav} from 'aurelia-materialize-bridge';

export class HeaderCustomElement {
  private sideNav: MdSidenav;
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  closePanel():boolean {
     this.sideNav.close();

     return true;
  }
}
