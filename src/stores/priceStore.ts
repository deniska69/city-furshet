import { action, makeAutoObservable, runInAction } from 'mobx';

import { getPrice } from '@services';

class PriceStore {
	categories: Map<string, TypePriceCategory> | undefined;
	products: Map<string, TypePriceProduct> | undefined;
	isPrice: boolean = false;

	private addCategory = action((values: TypePriceCategory) => {
		if (!this.categories) this.categories = new Map();
		if (this.categories.has(values.category_id)) return;
		this.categories.set(values.category_id, values);
	});

	private addProduct = action((values: TypePriceProduct) => {
		if (!this.products) this.products = new Map();
		if (this.products.has(values.product_id)) return;
		this.products.set(values.product_id, values);
	});

	getPrice = () => {
		getPrice()
			.then((data) => {
				data.forEach((row) => {
					const { category_id, category_hide, category_title, category_description } = row;

					this.addCategory({
						category_id,
						category_hide,
						category_title,
						category_description,
					});

					const {
						product_id,
						product_hide,
						product_title,
						product_description,
						product_note,
						product_note_additional,
						product_price,
						product_cover,
						product_gallery,
					} = row;

					this.addProduct({
						product_id,
						product_hide,
						product_title,
						product_description,
						product_note,
						product_note_additional,
						product_price,
						product_cover,
						product_gallery,
					});

					runInAction(() => (this.isPrice = true));
				});
			})
			.catch((e: unknown) => {
				alert('Ошибка загрузки прайса.\nСм. console.');
				console.error('Ошибка загрузки прайса.', e);
			});
	};
}

export const priceStore = makeAutoObservable(new PriceStore());
