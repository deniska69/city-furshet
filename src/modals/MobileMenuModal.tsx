import { useNavigate } from 'react-router-dom';

import { Dialog } from '@components';
import { goBack, scrollToMenu } from '@helpers';

export const MobileMenuModal = () => {
	const navigate = useNavigate();

	const handleOpenMenu = () => {
		navigate(goBack());
		setTimeout(scrollToMenu, 250);
	};

	const handleClose = () => navigate(goBack());

	const handleOpenOrders = () => navigate('/orders');

	const handleOpenDelivery = () => navigate('/delivery');

	const handleOpenContacts = () => navigate('/contacts');

	return (
		<Dialog title="City Furshet">
			<div className="mobile-menu">
				<a className="mobile-menu-link" onClick={handleOpenMenu}>
					Меню
				</a>
				<a className="mobile-menu-link" onClick={handleOpenDelivery}>
					Доставка и оплата
				</a>
				<a className="mobile-menu-link" onClick={handleOpenContacts}>
					Контакты
				</a>
				<a className="mobile-menu-link" onClick={handleOpenOrders}>
					Заказы
				</a>
				<a className="mobile-menu-link" onClick={handleClose}>
					Закрыть
				</a>
			</div>
		</Dialog>
	);
};
