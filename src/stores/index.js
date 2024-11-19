import { makeAutoObservable, action, observable, toJS, values } from "mobx";
import { getPrice, sendOrder } from "services";

class ProductsStore {
  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init = action(() => {
    this.categories = observable.array([]);
    this.products = observable.map({});
    this.basket = observable.map({});
    this.orders = observable.array([]);
    this.selectedCategory = null;
    this.loading = true;
    this.isSuccessOrder = false;

    this.fetchData();
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

          this.categories = Object.keys(data).map((cat) => ({
            id: data[cat]?.id,
            title: data[cat]?.title,
            description: data[cat]?.description,
          }));
          this.selectedCategory = this.categories[0];
          this.loading = false;

          this.readBasketFromStorage();
          this.readOrdersFromStorage();

          this.categories.forEach((category) => this.recalcCategoryCounters(category?.id));
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

    this.categories = observable.array(
      toJS(this.categories).map((el) => (el?.id === categoryId ? { ...el, count } : el))
    );

    this.recalcCategoryCounters(categoryId);

    this.writoBasketToStorage();
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

    this.recalcCategoryCounters(categoryId);

    this.writoBasketToStorage();
  };

  onPressDelete = (categoryId, id) => {
    const product = toJS(this.products.get(categoryId).get(id));
    this.products.get(categoryId).set(id, { ...product, count: 0 });
    this.basket.delete(id);

    this.recalcCategoryCounters(categoryId);

    this.writoBasketToStorage();
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
    let telegram = "<b>⭐ Новый заказ! ⭐</b>%0A%0A";

    this.getBasketItems().forEach((item, index) => {
      telegram += `<a href="${import.meta.env.VITE_URL}?category_id=${item?.categoryId}%26amp;card_id=${item?.id}">${
        index + 1
      }. ${item?.title}${item?.subtitle ? " (" + item?.subtitle + ")" : ""}</a>%0A`;

      telegram += `<i>${item?.price} ₽ x ${item?.count} шт. = ${item?.price * item?.count} ₽.</i>%0A%0A`;
    });

    telegram += `Итого: <b>${this.getBasketTotalPrice()}</b> ₽.%0A%0AКонтакт: <code>${contact}</code>`;

    // --------------------------------------

    let email = "";

    this.getBasketItems().forEach((item, index) => {
      email += `<a href="${import.meta.env.VITE_URL}?category_id=${item?.categoryId}&card_id=${item?.id}">${
        index + 1
      }. ${item?.title}${item?.subtitle ? " (" + item?.subtitle + ")" : ""}</a><br>`;

      email += `<i>${item?.price} ₽ x ${item?.count} шт. = ${item?.price * item?.count} ₽.</i><br><br>`;
    });

    email += `<span>Итого: <b>${this.getBasketTotalPrice()}</b> ₽.</span><br><br>Контакт: <code>${contact}</code>`;

    // --------------------------------------

    sendOrder({ telegram, email })
      .then(() => this.saverOrdersToStorage())
      .catch(() => alert("Ошибка отправки заказа #1."));
  };

  writoBasketToStorage = () => localStorage.setItem("basket", JSON.stringify(this.basket));

  readBasketFromStorage = () => {
    const result = JSON.parse(localStorage.getItem("basket"));

    if (result?.length > 0) {
      this.basket = observable.map(result);
      values(this.basket).forEach((item) => this.products.get(item?.categoryId).set(item?.id, item));
    }
  };

  saverOrdersToStorage = action(() => {
    this.orders.push({
      date: new Date(),
      items: values(this.basket),
      total: this.getBasketTotalPrice(),
    });

    values(this.basket).forEach((item) => this.onPressDelete(item?.categoryId, item?.id));

    localStorage.setItem("orders", JSON.stringify(this.orders));
    this.isSuccessOrder = true;
  });

  readOrdersFromStorage = action(() => {
    const result = JSON.parse(localStorage.getItem("orders"));

    if (result?.length > 0) this.orders = observable.array(result);
  });

  getProducts = (categoryId, id) => {
    if (!this.products?.size && !!this.products?.size) return [];
    return toJS(this.products.get(categoryId).get(id));
  };

  recalcCategoryCounters = (categoryId) => {
    let total = 0;

    values(this.products.get(categoryId)).forEach((el) => (total += el?.count || 0));

    this.categories = observable.array(
      toJS(this.categories).map((el) => (el?.id === categoryId ? { ...el, count: total } : el))
    );
  };
}

const store = new ProductsStore();

export { store };
