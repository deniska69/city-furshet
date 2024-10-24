// modal info: https://github.com/kylefox/jquery-modal/

import Storage from "./storage.js";

const KEY = "basket";

export default class Basket extends Storage {
  constructor() {
    super();
    this.items = new Map();
    this.mobileBtn = document.getElementById("header-mobile-basket-wrap");
    this.desktopBtn = document.getElementById("header-basket-wrap");
    this.closeBtn = document.getElementById("basket-close");
  }

  init() {
    this.mobileBtn.addEventListener("click", () => this.open());
    this.desktopBtn.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
  }

  add(item) {
    if (!this.items.has(item?.id)) {
      this.items.set(item?.id, { ...item, count: 1 });
    } else {
      const currentItem = this.items.get(item?.id);
      this.items.set(item?.id, { ...currentItem, count: currentItem?.count + 1 });
    }
  }

  remove(item) {
    if (!this.items.has(item?.id)) {
      return;
    } else {
      const currentItem = this.items.get(item?.id);

      if (currentItem?.count < 2) {
        this.items.delete(item?.id);
      } else {
        this.items.set(item?.id, { ...currentItem, count: currentItem?.count - 1 });
      }
    }
  }

  count(item) {
    return this.items.get(item?.id)?.count || 0;
  }

  totalCount() {
    if (!this.items.size) return 0;

    let count = 0;
    this.items.forEach((item) => (count = count + item?.count));
    return count;
  }

  open() {
    $("#basket-modal").modal({ fadeDuration: 100, showClose: false });
    document.getElementById("basket-modal").style.display = "flex";
  }

  close() {
    $.modal.close();
  }
}
