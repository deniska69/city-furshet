import { observer } from 'mobx-react';

import { basketStore, priceStore } from '@stores';

interface ICategoriesMobile {
	selectedId: string;
	onPressCategory: (categoryId: string) => void;
}

export const Component = ({ selectedId, onPressCategory }: ICategoriesMobile) => {
	const categories = priceStore.getCategories();

	if (!categories) return null;

	return (
		<div id="menu-categories-mobile">
			{categories.map((item) => {
				const active = item.category_id === selectedId ? ' active' : '';
				const count = basketStore.getCountCategory(item.category_id);

				return (
					<a
						key={item.category_id}
						id={item.category_id}
						className={`category-button${active}`}
						href={`#menu-main-${item.category_id}`}
						onClick={() => onPressCategory(item.category_id)}
					>
						{item.category_title}

						{count ? (
							<div id="header-basket-badge-wrap">
								<span id="header-basket-badge-counter">{count}</span>
							</div>
						) : null}
					</a>
				);
			})}
		</div>
	);
};

export const CategoriesMobile = observer(Component);
