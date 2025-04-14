import { makeAutoObservable, values } from 'mobx';

class BasketStore {
	items: Map<string, TypePriceProduct[]> | undefined;

	add = (categoryId: string, productId: string) => {};

	getTotal = () => {
		return 0;
		// if (!this.items?.size) return 0;

		// let sum = 0;

		// values(this.items).forEach((el) => (sum += el?.count));

		// return sum;
	};
}

export const basketStore = makeAutoObservable(new BasketStore());
