import { useWindowDimensions } from '@hooks';

import { CategoriesDesktop } from './CategoriesDesktop';
import { CategoriesMobile } from './CategoriesMobile';

interface ICategories {
	categories: TypePriceCategory[];
	selectedId: string;
	onPressCategory: (categoryId: string) => void;
}

export const Categories = (props: ICategories) => {
	const { isMobile } = useWindowDimensions();
	if (isMobile) return <CategoriesMobile {...props} />;
	return <CategoriesDesktop {...props} />;
};
