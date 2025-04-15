import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Categories, Loader, MenuMain } from '@components';
import { basketStore, priceStore } from '@stores';

import '@styles/Menu.css';

const Component = () => {
	const navigate = useNavigate();

	const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

	const loading = priceStore.loading;
	const categories = priceStore.getCategories();

	useEffect(() => {
		if (priceStore.isPrice && categories) {
			setSelectedId(categories[0].category_id);
		}
	}, [priceStore.isPrice]);

	const handlePressCategory = (categoryId: string) => setSelectedId(categoryId);

	const handlePressCard = (categoryId: string, productId: string) => {
		navigate(`?category_id=${categoryId}&card_id=${productId}`);
	};

	const handlePressAddToBasket = (categoryId: string, productId: string) => {
		basketStore.add(categoryId, productId);
	};

	const handlePressRemoveFromBasket = (categoryId: string, productId: string) => {
		basketStore.remove(categoryId, productId);
	};

	const handleGetProducts = (categoryId: string) => priceStore.getProducts(categoryId);

	if (loading || !categories || !selectedId) return <LoadPlaceholder />;

	const selectedCategory = priceStore.getCategory(selectedId);

	if (!selectedCategory) return <LoadPlaceholder />;

	return (
		<div id="menu" className="noselect">
			<div id="menu-container">
				<Categories {...{ categories, selectedId, onPressCategory: handlePressCategory }} />

				<MenuMain
					{...{
						categories,
						selectedCategory,
						getProducts: handleGetProducts,
						onPressCard: handlePressCard,
						onPressAdd: handlePressAddToBasket,
						onPressRemove: handlePressRemoveFromBasket,
					}}
				/>
			</div>
		</div>
	);
};

export const Menu = observer(Component);

const LoadPlaceholder = () => (
	<div id="menu">
		<div id="loader-wrap">
			<Loader />
		</div>
	</div>
);
