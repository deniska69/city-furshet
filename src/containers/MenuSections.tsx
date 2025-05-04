import { observer } from 'mobx-react';

import { priceStore } from '@stores';

import { Card } from './Card';

interface IMenuMain {
	selectedCategory: TypePriceCategory;
}

const Component = ({ selectedCategory }: IMenuMain) => {
	const handleGetProducts = (categoryId: string) => priceStore.getProducts(categoryId);

	if (!selectedCategory) return null;

	const idSection = `menu-main-${selectedCategory.category_id}`;
	const idGrid = `menu-main-grid-${selectedCategory.category_id}`;
	const title = selectedCategory.category_title;
	const cards = handleGetProducts(selectedCategory.category_id);

	return (
		<div id="menu-main">
			<div key={idSection} id={idSection} className="menu-section">
				<div className="menu-main-header">
					<span className="menu-main-title">{title}</span>
					{selectedCategory.category_description ? (
						<span>{selectedCategory.category_description}</span>
					) : null}
				</div>

				<div id={idGrid} className="menu-items">
					{cards &&
						cards.map((card) => (
							<Card
								key={card.product_id}
								productId={card.product_id}
								categoryId={selectedCategory.category_id}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export const MenuSections = observer(Component);
