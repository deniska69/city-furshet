import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Card } from '@components';
import { useWindowDimensions } from '@hooks';
import { basketStore, priceStore } from '@stores';

interface IMenuMain {
	selectedCategory: TypePriceCategory;
}

const Component = ({ selectedCategory }: IMenuMain) => {
	const navigate = useNavigate();
	const { isMobile } = useWindowDimensions();

	const categories = priceStore.getCategories();
	const sections = isMobile ? categories : [selectedCategory];

	const handlePressCard = (categoryId: string, productId: string) => {
		navigate(`?category_id=${categoryId}&card_id=${productId}`);
	};

	const handlePressAddToBasket = (categoryId: string, productId: string) => {
		basketStore.add(categoryId, productId);
	};

	const handlePressRemoveFromBasket = (productId: string) => basketStore.remove(productId);

	const handleGetProducts = (categoryId: string) => priceStore.getProducts(categoryId);

	const handleGetCountProduct = (productId: string) => basketStore.getCountProduct(productId);

	if (!sections) return null;

	return (
		<div id="menu-main">
			{sections.map((item) => {
				const idSection = `menu-main-${item.category_id}`;
				const idGrid = `menu-main-grid-${item.category_id}`;
				const title = item.category_title;
				const cards = handleGetProducts(item.category_id);

				return (
					<div key={idSection} id={idSection} className="menu-section">
						<div className="menu-main-header">
							<span className="menu-main-title">{title}</span>
							{item.category_description ? <span>{item.category_description}</span> : null}
						</div>

						<div id={idGrid} className="menu-items">
							{cards &&
								cards.map((card) => (
									<Card
										{...card}
										key={card.product_id}
										categoryId={item.category_id}
										count={handleGetCountProduct(card.product_id)}
										onPressCard={handlePressCard}
										onPressAdd={handlePressAddToBasket}
										onPressRemove={handlePressRemoveFromBasket}
									/>
								))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export const MenuSections = observer(Component);
