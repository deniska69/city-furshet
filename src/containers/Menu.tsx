import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { MenuLoader } from '@components';
import { useWindowDimensions } from '@hooks';
import { priceStore } from '@stores';

import { CategoriesDesktop } from './CategoriesDesktop';
import { CategoriesMobile } from './CategoriesMobile';
import { MenuSections } from './MenuSections';

const Component = () => {
	const navigate = useNavigate();
	const { isMobile } = useWindowDimensions();
	const [searchParams] = useSearchParams();

	const categoryId = searchParams.get('category_id') || null;

	const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

	const loading = priceStore.loading;
	const categories = priceStore.getCategories();

	useEffect(() => {
		if (categoryId) {
			setSelectedId(categoryId);
		} else if (categories) {
			setSelectedId(categories[0].category_id);
		}
	}, [categoryId, categories?.length]);

	const handlePressCategory = (categoryId: string) => {
		setSelectedId(categoryId);
		navigate(`?category_id=${categoryId}`);
	};

	if (loading || !categories || !selectedId) return <MenuLoader />;

	const selectedCategory = priceStore.getCategory(selectedId);

	if (!selectedCategory) return <MenuLoader />;

	return (
		<div
			id="menu"
			className="noselect min-h-[calc(100vh-var(--header-height))] lg:max-h-[calc(100vh-var(--header-height))] w-full flex justify-center scroll-mt-(--header-height)"
		>
			<div className="w-full max-w-7xl flex items-start flex-col lg:flex-row lg:w-min lg:min-w-[1150px]">
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
