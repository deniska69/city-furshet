import { makeAutoObservable, toJS, values } from 'mobx';

class BasketStore {
	items: TypeBasket | undefined;

	add = (categoryId: string, productId: string) => {
		if (!this.items) this.items = new Map();
		if (!this.items.has(productId)) {
			this.items.set(productId, { categoryId, productId, count: 1 });
		} else {
			const item = toJS(this.items.get(productId)) as TypeBasketItem;
			this.items.set(productId, { ...item, count: item.count + 1 });
		}
	};

	remove = (productId: string) => {
		if (!this.items) this.items = new Map();
		if (!this.items.has(productId)) return;
		const item = toJS(this.items.get(productId)) as TypeBasketItem;
		const count = item.count > 1 ? item.count - 1 : 0;
		this.items.set(productId, { ...item, count });
	};

	getCountProduct = (productId: string) => {
		if (!this.items || !this.items.has(productId)) return 0;
		return this.items.get(productId)?.count || 0;
	};

	getCountCategory = (categoryId: string) => {
		if (!this.items) return 0;
		const items = toJS(values(this.items));
		console.log(items);
	};

	getCountTotal = () => {
		if (!this.items?.size) return 0;

		// let sum = 0;

		// values(this.items).forEach((el) => (sum += el?.count));

		// return sum;
	};
}

export const basketStore = makeAutoObservable(new BasketStore());
