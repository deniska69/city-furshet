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
		<div
			key={idSection}
			id={idSection}
			className="flex flex-col justify-start w-full pt-4 pb-8 lg:max-h-[calc(100vh-var(--header-height))] overflow-y-auto"
		>
			<div className="flex flex-col pl-5">
				<span className="text-base text-xl font-bold">{title}</span>
				{selectedCategory.category_description ? (
					<span className="font-light">{selectedCategory.category_description}</span>
				) : null}
			</div>

			<div id={idGrid} className="flex flex-row flex-wrap gap-3 mt-2 px-2 w-full">
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
	);
};

export const MenuSections = observer(Component);
