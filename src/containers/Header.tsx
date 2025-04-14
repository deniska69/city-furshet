import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { HeaderDesktop, HeaderMobile } from '@components';
import { useWindowDimensions } from '@hooks';
import { basketStore } from '@stores';

const Component = () => {
	const navigate = useNavigate();
	const { isMobile } = useWindowDimensions();

	const basketTotal = basketStore.getTotal();

	const onOpenBasket = () => navigate('/basket');

	const onOpenMobileMenu = () => navigate('/mobile-menu');

	const onOpenOrders = () => navigate('/orders');

	const onOpenDelivery = () => navigate('/delivery');

	const onOpenContacts = () => navigate('/contacts');

	if (isMobile) return <HeaderMobile {...{ basketTotal, onOpenBasket, onOpenMobileMenu }} />;

	return (
		<HeaderDesktop
			{...{ basketTotal, onOpenBasket, onOpenOrders, onOpenDelivery, onOpenContacts }}
		/>
	);
};

export const Header = observer(Component);
