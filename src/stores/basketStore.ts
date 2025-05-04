import { keys, makeAutoObservable, runInAction, toJS, values } from 'mobx';

import { sendOrder } from '@services';

import { ordersStore } from './ordersStore';
import { priceStore } from './priceStore';

const key = 'basket_v2';

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

		this.saveBasketToStore();
	};

	remove = (categoryId: string, productId: string) => {
		if (!this.items) return;
		if (!this.items.has(categoryId)) return;
		const items = toJS(this.items.get(categoryId));
		const count = items && items[productId] ? items[productId] : 0;
		this.items.set(categoryId, { ...items, [productId]: count > 0 ? count - 1 : 0 });

		this.saveBasketToStore();
	};

	delete = (categoryId: string, productId: string) => {
		if (!this.items) return;
		if (!this.items.has(categoryId)) return;

		let items = toJS(this.items.get(categoryId));
		if (items) {
			delete items[productId];
			this.items.set(categoryId, items);
		}

		this.saveBasketToStore();
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

	private getMessageForTelegram = (contact: string) => {
		const items = this.getItems();

		if (!items) {
			console.error('getMessageForTelegram() - items:', items);
			return '';
		}

		let message = '<b>⭐ Новый заказ! ⭐</b>%0A%0A';

		items.forEach((item, index) => {
			const href = import.meta.env.VITE_URL;
			const count = item.count;
			const categoryId = item.categoryId;
			const productId = item.productId;
			const product = priceStore.getProduct(categoryId, productId);

			if (!product) return alert('getMessageForTelegram(): не найден продукт id: ' + productId);

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

	private getMessageForEmail = (contact: string) => {
		const items = this.getItems();

		if (!items) {
			console.error('getMessageForEmail() - items:', items);
			return '';
		}

		let message = '';

		items.forEach((item, index) => {
			const count = item.count;
			const categoryId = item.categoryId;
			const productId = item.productId;
			const product = priceStore.getProduct(categoryId, productId);

			if (!product) return alert('getMessageForEmail(): не найден продукт id: ' + productId);

			const href = import.meta.env.VITE_URL;
			const title = product.product_title;
			const note = product.product_note;
			const price = product.product_price;

			message += `<a href="${href}?category_id=${categoryId}&card_id=${productId}">${
				index + 1
			}. ${title}${note ? ' (' + note + ')' : ''}</a><br>`;

			message += `<i>${price} ₽ x ${count} шт. = ${parseInt(price) * count} ₽.</i><br><br>`;
		});

		message += `<span>Итого: <b>${this.getPriceTotal()}</b> ₽.</span><br><br>Контакт: <code>${contact}</code>`;

		return message;
	};

	submit = (contact: string) => {
		const telegram = this.getMessageForTelegram(contact);
		const email = this.getMessageForEmail(contact);

		sendOrder({ telegram, email })
			.then(() => {
				if (!this.items) return;
				ordersStore.add(this.items);

				runInAction(() => {
					this.items = undefined;
					this.saveBasketToStore();
				});

				this.setOrderStatus(true);
			})
			.catch(() => alert('Ошибка отправки заказа #1.'));
	};

	private saveBasketToStore = () => localStorage.setItem(key, JSON.stringify(this.items));

	restoreBasketFromStore = () => {
		const store = localStorage.getItem(key);
		this.items = store ? new Map(JSON.parse(store)) : undefined;
	};
}

export const basketStore = makeAutoObservable(new BasketStore());
