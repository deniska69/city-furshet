import { makeAutoObservable, action } from "mobx";

import { store } from "./";

export default class ModalsStore {
  constructor() {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenOrders = false;
    this.isOpenCard = false;

    makeAutoObservable(this);
  }

  onAnyClose = action(() => {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenOrders = false;
    this.isOpenCard = false;
  });

  onOpenBasket = action(() => {
    this.isOpenMobileMenu = false;
    this.isOpenOrders = false;
    this.isOpenCard = false;

    this.isOpenBasket = true;

    store.isSuccessOrder = false;
  });

  onCloseBasket = () => this.onAnyClose();

  onOpenMobileMenu = action(() => {
    this.isOpenBasket = false;
    this.isOpenOrders = false;
    this.isOpenCard = false;

    this.isOpenMobileMenu = true;
  });

  onCloseMobileMenu = () => this.onAnyClose();

  onOpenOrders = action(() => {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenCard = false;

    this.isOpenOrders = true;
  });

  onCloseOrders = () => this.onAnyClose();

  onOpenCard = action(() => {
    this.isOpenBasket = false;
    this.isOpenMobileMenu = false;
    this.isOpenOrders = false;

    this.isOpenCard = true;
  });

  onCloseCard = () => this.onAnyClose();
}
