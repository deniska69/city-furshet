// modal info: https://github.com/kylefox/jquery-modal/

import Storage from "./storage.js";

const KEY = "basket";

export default class Basket extends Storage {
  constructor() {
    super();
    this.items = new Map();
    // this.dialog = document.getElementById("basket-dialog");
    this.mobileBtn = document.getElementById("header-mobile-basket-wrap");
    this.desktopBtn = document.getElementById("header-basket-wrap");
    // this.closeBtn = document.getElementById("basket-close");

    // window.addEventListener("scroll", () => {
    //   document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    // });
  }

  init() {
    console.log("[Basket] init()");

    this.mobileBtn.addEventListener("click", () => this.open());
    this.desktopBtn.addEventListener("click", () => this.open());
    // this.closeBtn.addEventListener("click", () => this.close());
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
    // document.htm
    // document.body.classList.add("no-scroll");
    // this.dialog.showModal();
    // document.getElementById("dialog").classList.add("show");
    // const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
    // const body = document.body;
    // body.style.position = "fixed";
    // body.style.top = `-${scrollY}`;

    $("#basket-modal").modal({ fadeDuration: 100 });
  }

  close() {
    // document.body.classList.remove("no-scroll");
    // this.dialog.close();
    // const body = document.body;
    // const scrollY = body.style.top;
    // body.style.position = "";
    // body.style.top = "";
    // window.scrollTo(0, parseInt(scrollY || "0") * -1);
    // document.getElementById("dialog").classList.remove("show");
  }
}
