import { action, makeAutoObservable, runInAction, toJS, values } from 'mobx';

import { getPrice } from '@services';

class PriceStore {
	private categories: Map<string, TypePriceCategory> | undefined;
	private products: Map<string, TypePriceProduct[]> | undefined;
	isPrice: boolean = false;
	loading: boolean = false;

	private addCategory = action((category: TypePriceCategory) => {
		if (category.category_hide) return;
		if (!this.categories) this.categories = new Map();
		if (this.categories.has(category.category_id)) return;
		this.categories.set(category.category_id, category);
	});

	private addProduct = action((categoryId: string, product: TypePriceProduct) => {
		if (product.product_hide) return;
		if (!this.products) this.products = new Map();

		if (!this.products.has(categoryId)) {
			this.products.set(categoryId, [product]);
		} else {
			const items = toJS(this.products.get(categoryId));
			this.products.set(categoryId, [...(items || []), product]);
		}
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

					this.addProduct(category_id, {
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
				});

				runInAction(() => {
					this.isPrice = true;
					console.log(
						'%s %c[Price] Categories:',
						'\ud83d\ude80',
						'color: lime; font-weight: bold;',
					);
					console.log(JSON.parse(JSON.stringify(values(this.categories))));
					console.log(
						'%s %c[Price] Products:',
						'\ud83d\ude80',
						'color: orange; font-weight: bold;',
					);
					console.log(JSON.parse(JSON.stringify(values(this.products))));
				});
			})
			.catch((e: unknown) => {
				alert('Ошибка загрузки прайса.\nСм. console.');
				console.error('Ошибка загрузки прайса.', e);
			});
	};

	getCategories = () => {
		if (!this.categories) return undefined;
		return values(this.categories) as unknown as TypePriceCategory[];
	};

	getCategory = (categoryId: string) => {
		if (!this.categories || !this.categories.has(categoryId)) return undefined;
		return this.categories.get(categoryId) as unknown as TypePriceCategory;
	};

	getProducts = (categoryId: string) => {
		if (!this.products || !this.products.has(categoryId)) return undefined;
		return this.products.get(categoryId);
	};

	getProduct = (categoryId: string, productId: string) => {
		const items = this.getProducts(categoryId);
		if (!items) return undefined;
		return items.filter((el) => el.product_id === productId)[0];
	};
}

export const priceStore = makeAutoObservable(new PriceStore());
