import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { HeaderDesktop, HeaderMobile } from '@components';
import { scrollToMenu } from '@helpers';
import { useWindowDimensions } from '@hooks';
import { basketStore } from '@stores';

const Component = () => {
	const navigate = useNavigate();
	const { isMobile } = useWindowDimensions();

	const basketTotal = basketStore.getCountTotal(); // TODO

	const handleOpenMenu = () => scrollToMenu();

	const handleOpenBasket = () => navigate('/basket');

	const handleOpenMobileMenu = () => navigate('/mobile-menu');

	const handleOpenOrders = () => navigate('/orders');

	const handleOpenDelivery = () => navigate('/delivery');

	const handleOpenContacts = () => navigate('/contacts');

	console.log({ basketTotal }); // TODO

	if (isMobile) {
		return (
			<HeaderMobile
				basketTotal={1}
				onOpenBasket={handleOpenBasket}
				onOpenMobileMenu={handleOpenMobileMenu}
			/>
		);
	}

	return (
		<HeaderDesktop
			basketTotal={1}
			onOpenMenu={handleOpenMenu}
			onOpenBasket={handleOpenBasket}
			onOpenOrders={handleOpenOrders}
			onOpenDelivery={handleOpenDelivery}
			onOpenContacts={handleOpenContacts}
		/>
	);
};

export const Header = observer(Component);
