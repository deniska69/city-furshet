import '@styles/CategoriesDesktop.css';

interface ICategoriesDesktop {
	categories: TypePriceCategory[];
	selectedId: string;
	onPressCategory: (categoryId: string) => void;
}

export const CategoriesDesktop = (props: ICategoriesDesktop) => {
	const { categories, selectedId, onPressCategory } = props;

	return (
		<div id="menu-categories-desktop">
			{categories.map((item) => {
				const active = item.category_id === selectedId ? ' active' : '';

				return (
					<button
						key={item.category_id}
						id={item.category_id}
						className={`category-button${active}`}
						onClick={() => onPressCategory(item.category_id)}
					>
						{item.category_title}

						{/* {item?.count ? (
							<div id="header-basket-badge-wrap">
								<span id="header-basket-badge-counter">{item?.count}</span>
							</div>
						) : null} */}
					</button>
				);
			})}
		</div>
	);
};
