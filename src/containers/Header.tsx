import { observer } from 'mobx-react';

import { HeaderDesktop, HeaderMobile } from '@components';
import { scrollToMenu } from '@helpers';
import { useWindowDimensions } from '@hooks';
import { basketStore } from '@stores';

interface IHeader {
	onOpenBasket: () => void;
	onOpenMobileMenu: () => void;
	onOpenOrders: () => void;
	onOpenDelivery: () => void;
	onOpenContacts: () => void;
}

const Component = (props: IHeader) => {
	const { isMobile } = useWindowDimensions();

	const basketTotal = basketStore.getCountTotal();

	const handleOpenMenu = () => scrollToMenu();

	if (isMobile) {
		return <HeaderMobile basketTotal={basketTotal} {...props} />;
	}

	return <HeaderDesktop basketTotal={basketTotal} onOpenMenu={handleOpenMenu} {...props} />;
};

export const Header = observer(Component);
