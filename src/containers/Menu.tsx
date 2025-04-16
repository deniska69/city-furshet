import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { Loader } from '@components';
import { useWindowDimensions } from '@hooks';
import { priceStore } from '@stores';

import { CategoriesDesktop } from './CategoriesDesktop';
import { CategoriesMobile } from './CategoriesMobile';
import { MenuSections } from './MenuSections';

const Component = () => {
	const { isMobile } = useWindowDimensions();

	const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

	const loading = priceStore.loading;
	const categories = priceStore.getCategories();

	useEffect(() => {
		if (priceStore.isPrice && categories) {
			setSelectedId(categories[0].category_id);
		}
	}, [priceStore.isPrice]);

	const handlePressCategory = (categoryId: string) => setSelectedId(categoryId);

	if (loading || !categories || !selectedId) return <LoadPlaceholder />;

	const selectedCategory = priceStore.getCategory(selectedId);

	if (!selectedCategory) return <LoadPlaceholder />;

	return (
		<div id="menu" className="noselect">
			<div id="menu-container">
				{isMobile ? (
					<CategoriesMobile selectedId={selectedId} onPressCategory={handlePressCategory} />
				) : (
					<CategoriesDesktop selectedId={selectedId} onPressCategory={handlePressCategory} />
				)}
				<MenuSections selectedCategory={selectedCategory} />
			</div>
		</div>
	);
};

export const Menu = observer(Component);

const LoadPlaceholder = () => (
	<div id="menu">
		<div id="loader-wrap">
			<Loader />
		</div>
	</div>
);
