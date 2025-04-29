import { makeAutoObservable } from 'mobx';

import { priceStore } from './priceStore';

const key = 'orders_v2';

class OrdersStore {
	add = (values: TypeBasket) => {
		const _items = new Map(values);

		const date = new Date().toISOString();
		let items: TypeOrderItem[] = [];
		let total = 0;

		_items.keys().forEach((categoryId) => {
			const category = priceStore.getCategory(categoryId) as TypePriceCategory;
			const products = _items.get(categoryId) as TypeBasketItem;

			Object.keys(products).forEach((productId) => {
				const product = priceStore.getProduct(categoryId, productId) as TypePriceProduct;
				const count = products[productId];

				items.push({ ...category, ...product, count });
				total += parseInt(product.product_price) * count;
			});
		});

		this.setOrderToStore({ date, items, total });
	};

	private getOrdersFromStore = (): TypeOrder[] => {
		const store = localStorage.getItem(key);
		return store ? JSON.parse(store) : [];
	};

	private setOrderToStore = (order: TypeOrder) => {
		const currentOrders = this.getOrdersFromStore();
		localStorage.setItem(key, JSON.stringify([...currentOrders, order]));
	};
}

export const ordersStore = makeAutoObservable(new OrdersStore());
