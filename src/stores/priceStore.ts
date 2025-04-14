import { action, makeAutoObservable } from 'mobx';

import { getPrice } from '@services';

class PriceStore {
	categories: TypePriceCategory[] | undefined;
	products: Map<string, TypePriceProduct[]> | undefined;

	getPrice = () => {
		getPrice()
			.then(
				action((data) => {
					console.log(data);
				}),
			)
			.catch((e: unknown) => {
				alert('Ошибка загрузки прайса.\nСм. console.');
				console.error('Ошибка загрузки прайса.', e);
			});
	};
}

export const priceStore = makeAutoObservable(new PriceStore());
