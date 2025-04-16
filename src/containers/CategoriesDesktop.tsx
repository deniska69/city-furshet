import { observer } from 'mobx-react';

import { priceStore } from '@stores';

interface ICategoriesDesktop {
	selectedId: string;
	onPressCategory: (categoryId: string) => void;
}

export const Component = ({ selectedId, onPressCategory }: ICategoriesDesktop) => {
	const categories = priceStore.getCategories();

	if (!categories) return null;

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

export const CategoriesDesktop = observer(Component);
