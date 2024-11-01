import { makeAutoObservable, action } from "mobx";

import { store } from "./";

export default class ModalsStore {
  constructor() {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenOrders = false;

    makeAutoObservable(this);
  }

  onAnyClose = action(() => {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenOrders = false;
  });

  onOpenBasket = action(() => {
    this.isOpenMobileMenu = false;
    this.isOpenOrders = false;
    this.isOpenBasket = true;
    store.isSuccessOrder = false;
  });

  onCloseBasket = () => this.onAnyClose();

  onOpenMobileMenu = action(() => {
    this.isOpenBasket = false;
    this.isOpenOrders = false;
    this.isOpenMobileMenu = true;
  });

  onCloseMobileMenu = () => this.onAnyClose();

  onOpenOrders = action(() => {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenOrders = true;
  });

  onCloseOrders = () => this.onAnyClose();
}
