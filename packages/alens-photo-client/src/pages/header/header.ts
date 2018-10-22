import {MdSidenav} from 'aurelia-materialize-bridge';

export class HeaderCustomElement {
  private sideNav: MdSidenav;

  closePanel():boolean {
     this.sideNav.close();

     return true;
  }
}
