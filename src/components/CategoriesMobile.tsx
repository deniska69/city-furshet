import '@styles/CategoriesMobile.css';

interface ICategoriesMobile {
	categories: TypePriceCategory[];
	selectedId: string;
	onPressCategory: (categoryId: string) => void;
}

export const CategoriesMobile = (props: ICategoriesMobile) => {
	const { categories, selectedId, onPressCategory } = props;

	return (
		<div id="menu-categories-mobile">
			{categories.map((item) => {
				const active = item.category_id === selectedId ? ' active' : '';

				return (
					<a
						key={item.category_id}
						id={item.category_id}
						className={`category-button${active}`}
						href={`#menu-main-${item.category_id}`}
						onClick={() => onPressCategory(item.category_id)}
					>
						{item.category_title}

						{/* {item?.count ? (
							<div id="header-basket-badge-wrap">
								<span id="header-basket-badge-counter">{item?.count}</span>
							</div>
						) : null} */}
					</a>
				);
			})}
		</div>
	);
};
