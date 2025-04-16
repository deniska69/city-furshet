import { observer } from 'mobx-react';

import { basketStore, priceStore } from '@stores';

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
				const count = basketStore.getCountCategory(item.category_id);

				return (
					<button
						key={item.category_id}
						id={item.category_id}
						className={`category-button${active}`}
						onClick={() => onPressCategory(item.category_id)}
					>
						{item.category_title}

						{count ? (
							<div id="header-basket-badge-wrap">
								<span id="header-basket-badge-counter">{count}</span>
							</div>
						) : null}
					</button>
				);
			})}
		</div>
	);
};

export const CategoriesDesktop = observer(Component);
