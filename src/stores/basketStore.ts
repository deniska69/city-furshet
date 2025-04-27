import { keys, makeAutoObservable, toJS, values } from 'mobx';

import { priceStore } from './priceStore';

class BasketStore {
	items: TypeBasket | undefined;
	isSuccessOrder: boolean = false;

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

	delete = (categoryId: string, productId: string) => {
		if (!this.items) return;
		if (!this.items.has(categoryId)) return;

		let items = toJS(this.items.get(categoryId));
		if (items) {
			delete items[productId];
			this.items.set(categoryId, items);
		}
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
		if (!this.items) return 0;

		let sum = 0;

		values(this.items).forEach((el) => {
			const category = el as unknown as Record<string, number>;

			for (const key in category) {
				sum += category[key];
			}
		});

		return sum;
	};

	getItems = (): TypeBasketGetItems => {
		if (!this.items) return undefined;

		let products: TypeBasketGetItems = undefined;

		keys(this.items).forEach((categoryId) => {
			const category =
				categoryId && this.items ? this.items.get(categoryId as string) : undefined;

			for (const productId in category) {
				const product = priceStore.getProduct(categoryId as string, productId);

				if (!product) continue;

				const item = {
					productId: product.product_id,
					count: category[productId],
					categoryId: categoryId as string,
				};

				if (!products) {
					products = [item];
				} else {
					products.push(item);
				}
			}
		});

		return products;
	};

	setOrderStatus = (value: boolean) => {
		this.isSuccessOrder = value;
	};

	getPriceTotal = () => {
		if (!this.items) return 0;

		let sum = 0;

		keys(this.items).forEach((categoryId) => {
			if (this.items) {
				const products = this.items.get(categoryId as string);

				for (const productId in products) {
					const product = priceStore.getProduct(categoryId as string, productId);
					const price = product && product.product_price ? parseInt(product.product_price) : 1;
					sum += products[productId] * price;
				}
			}
		});

		return sum;
	};

	submit = (contact: string) => {
		const messageForTelegram = this.getMessageForTelegram(contact);
	};

	private getMessageForTelegram = (contact: string) => {
		const items = this.getItems();

		if (!items) return console.error('basketStore subimt() - items:', items);

		let message = '<b>⭐ Новый заказ! ⭐</b>%0A%0A';

		items.forEach((item, index) => {
			const href = import.meta.env.VITE_URL;
			const count = item.count;
			const categoryId = item.categoryId;
			const productId = item.productId;
			const product = priceStore.getProduct(categoryId, productId);

			if (!product) return alert('Ошибка #1: не найден продукт id: ' + productId);

			const title = product.product_title;
			const note = product.product_note;
			const price = product.product_price;

			message += `<a href="${href}?category_id=${categoryId}%26amp;card_id=${productId}">${
				index + 1
			}. ${title}${note ? ' (' + note + ')' : ''}</a>%0A`;

			message += `<i>${price} ₽ x ${count} шт. = ${parseInt(price) * count} ₽.</i>%0A%0A`;
		});

		message += `Итого: <b>${this.getPriceTotal()}</b> ₽.%0A%0AКонтакт: <code>${contact}</code>`;

		return message;
	};
}

export const basketStore = makeAutoObservable(new BasketStore());
