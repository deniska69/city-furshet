import { makeAutoObservable, action } from "mobx";

export default class ModalsStore {
  constructor() {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenMyOrders = false;

    makeAutoObservable(this);
  }

  onAnyClose = action(() => {
    console.log("onAnyClose");
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenMyOrders = false;
  });

  onOpenBasket = action(() => {
    console.log("onOpenBasket");
    this.onAnyClose();
    this.isOpenBasket = true;
  });

  onCloseBasket = () => this.onAnyClose();

  onOpenMobileMenu = action(() => {
    this.onAnyClose();
    this.isOpenMobileMenu = true;
  });

  onCloseMobileMenu = () => this.onAnyClose();

  onOpenMyOrders = action(() => {
    this.onAnyClose();
    this.isOpenMyOrders = true;
  });

  onCloseMyOrders = () => this.onAnyClose();
}
