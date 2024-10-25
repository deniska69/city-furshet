import { makeAutoObservable, action, observable, toJS, values } from "mobx";
import { getPrice } from "services";

class ProductsStore {
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
  };

  getBasketTotal = () => {
    if (!this.basket?.size) return 0;

    let sum = 0;

    values(this.basket).forEach((el) => (sum += el?.count));

    return sum;
  };
}

const store = new ProductsStore();

export { store };
