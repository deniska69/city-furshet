import { makeAutoObservable, toJS } from 'mobx';

class BasketStore {
	items: TypeBasket | undefined;

	add = (categoryId: string, productId: string) => {
		if (!this.items) this.items = new Map();
		if (!this.items.has(categoryId)) {
			this.items.set(categoryId, { [productId]: 1 });
		} else {
			const items = toJS(this.items.get(categoryId));
			const count = items && items[productId] ? items[productId] : 0;
			this.items.set(categoryId, { ...items, [productId]: count + 1 });
		}
	};

	remove = (categoryId: string, productId: string) => {
		if (!this.items) return;
		if (!this.items.has(categoryId)) return;
		const items = toJS(this.items.get(categoryId));
		const count = items && items[productId] ? items[productId] : 0;
		this.items.set(categoryId, { ...items, [productId]: count > 0 ? count - 1 : 0 });
	};

	getCountProduct = (categoryId: string, productId: string) => {
		if (!this.items || !this.items.has(categoryId)) return 0;
		const items = toJS(this.items.get(categoryId));
		return items && items[productId] ? items[productId] : 0;
	};

	getCountCategory = (categoryId: string) => {
		if (!this.items || !this.items.has(categoryId)) return 0;
		const items = toJS(this.items.get(categoryId));
		let count = 0;
		for (const key in items) {
			count += items[key];
		}
		return count;
	};

	getCountTotal = () => {
		if (!this.items?.size) return 0;

		// let sum = 0;

		// values(this.items).forEach((el) => (sum += el?.count));

		// return sum;
	};
}

export const basketStore = makeAutoObservable(new BasketStore());
