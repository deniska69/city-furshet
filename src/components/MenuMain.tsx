import { useWindowDimensions } from '@hooks';

import { Card } from './Card';

interface IMenuMain {
	categories: TypePriceCategory[];
	selectedCategory: TypePriceCategory;
	onPressCard: (categoryId: string, productId: string) => void;
	onPressAdd: (categoryId: string, productId: string) => void;
	onPressRemove: (categoryId: string, productId: string) => void;
	getProducts: (categoryId: string) => TypePriceProduct[] | undefined;
}

export const MenuMain = (props: IMenuMain) => {
	const { categories, selectedCategory, onPressCard, onPressAdd, onPressRemove, getProducts } =
		props;

	const { isMobile } = useWindowDimensions();

	const sections = isMobile ? categories : [selectedCategory];

	return (
		<div id="menu-main">
			{sections.map((item) => {
				const idSection = `menu-main-${item.category_id}`;
				const idGrid = `menu-main-grid-${item.category_id}`;
				const title = item.category_title;
				const cards = getProducts(item.category_id);

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
										count=""
										{...card}
										key={card.product_id}
										categoryId={item.category_id}
										{...{ onPressCard, onPressAdd, onPressRemove }}
									/>
								))}
						</div>
					</div>
				);
			})}
		</div>
	);
};
