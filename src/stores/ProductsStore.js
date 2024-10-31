import { makeAutoObservable, action, observable, toJS, values } from "mobx";
import { getPrice, sendTelegram } from "services";

export default class ProductsStore {
  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init = action(() => {
    this.categories = observable.array([]);
    this.products = observable.map({});
    this.basket = observable.map({});
    this.selectedCategory = null;
    this.loading = true;

    this.fetchData();
    this.readLocalStorage();
  });

  fetchData = () => {
    getPrice()
      .then(
        action((data) => {
          Object.keys(data).forEach((cat) => {
            if (!this.products.has(cat)) {
              this.products.set(cat, observable.map({}));
            }

            data[cat]?.items.forEach((card) => {
              this.products.get(card?.categoryId).set(card?.id, card);
            });
          });
          this.categories = Object.keys(data).map((cat) => ({ id: data[cat]?.id, title: data[cat]?.title }));
          this.selectedCategory = this.categories[0];
          this.loading = false;
        })
      )
      .catch((e) => {
        alert("Ошибка загрузки прайса.\nСм. console.");
        console.error("Ошибка загрузки прайса.", e);
      });
  };

  onPressCategory = action((cat) => (this.selectedCategory = cat));

  onPressPlus = (categoryId, id) => {
    const product = toJS(this.products.get(categoryId).get(id));
    const count = (product?.count || 0) + 1;
    this.products.get(categoryId).set(id, { ...product, count });
    this.basket.set(product?.id, this.products.get(categoryId).get(id));

    this.writoToStorage();
  };

  onPressMinus = (categoryId, id) => {
    const product = toJS(this.products.get(categoryId).get(id));
    const count = product?.count > 0 ? product?.count - 1 : 0;
    this.products.get(categoryId).set(id, { ...product, count });

    if (count < 1) {
      this.basket.delete(product?.id);
    } else {
      this.basket.set(product?.id, this.products.get(categoryId).get(id));
    }

    this.writoToStorage();
  };

  onPressDelete = (categoryId, id) => {
    const product = toJS(this.products.get(categoryId).get(id));
    this.products.get(categoryId).set(id, { ...product, count: 0 });
    this.basket.delete(id);

    this.writoToStorage();
  };

  getBasketTotalCount = () => {
    if (!this.basket?.size) return 0;

    let sum = 0;

    values(this.basket).forEach((el) => (sum += el?.count));

    return sum;
  };

  getBasketTotalPrice = () => {
    if (!this.basket?.size) return 0;

    let sum = 0;

    values(this.basket).forEach((el) => (sum += (el?.count || 0) * (el?.price || 0)));

    return sum;
  };

  getBasketItems = () => {
    if (this.basket?.size > 0) return values(this.basket);
    return null;
  };

  onSubmit = (contact) => {
    let text = "<b>⭐ Новый заказ! ⭐</b>%0A%0A";

    this.getBasketItems().forEach((item, index) => {
      text += `${index + 1}. ${item?.title} (${item?.price} ₽) x ${item?.count} шт. = ${
        item?.price * item?.count
      } ₽.%0A`;
    });

    text += `%0AИтого: <b>${this.getBasketTotalPrice()}</b> ₽.%0A%0AКонтакт: <code>${contact}</code>`;

    sendTelegram(text)
      .then(() => console.log(1))
      .catch(() => console.log(2));
  };

  writoToStorage = () => localStorage.setItem("basket", JSON.stringify(this.basket));

  readLocalStorage = () => {
    const result = JSON.parse(localStorage.getItem("basket"));
    if (result?.length > 0) {
      this.basket = observable.map(result);
    }
  };
}
