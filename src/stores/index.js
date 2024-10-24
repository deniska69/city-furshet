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

  getProductsCategory = () => values(this.products.get(this.selectedCategory?.id));

  onPressCategory = action((cat) => (this.selectedCategory = cat));

  onPressPlus = (categoryId, id) => {
    const product = this.products.get(categoryId).get(id);
    const count = this.basket.get(product?.id)?.count || 0;
    this.basket.set(product?.id, { ...product, count: count + 1 });
  };

  onPressMinus = (categoryId, id) => {
    const product = this.products.get(categoryId).get(id);
    const count = this.basket.get(product?.id)?.count || 0;

    if (count - 1 < 1) {
      this.basket.delete(product?.id);
    } else {
      this.basket.set(product?.id, { ...product, count: count - 1 });
    }
  };

  getBasketTotal = () => this.basket?.size || 0;
}

const store = new ProductsStore();

export { store };
