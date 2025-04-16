import { observer } from 'mobx-react';

import { useWindowDimensions } from '@hooks';
import { priceStore } from '@stores';

import { Card } from './Card';

interface IMenuMain {
	selectedCategory: TypePriceCategory;
}

const Component = ({ selectedCategory }: IMenuMain) => {
	const { isMobile } = useWindowDimensions();

	const categories = priceStore.getCategories();
	const sections = isMobile ? categories : [selectedCategory];

	const handleGetProducts = (categoryId: string) => priceStore.getProducts(categoryId);

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
										key={card.product_id}
										productId={card.product_id}
										categoryId={item.category_id}
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
