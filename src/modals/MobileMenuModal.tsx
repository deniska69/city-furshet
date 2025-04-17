import { useNavigate } from 'react-router-dom';

import { Dialog } from '@components';
import { useEscape } from '@hooks';

export const MobileMenuModal = () => {
	const navigate = useNavigate();

	const handleClose = () => navigate('/');

	useEscape(handleClose);

	const handleOpenOrders = () => navigate('/orders');

	const handleOpenDelivery = () => navigate('/delivery');

	const handleOpenContacts = () => navigate('/contacts');

	return (
		<Dialog title="City Furshet" onClose={handleClose}>
			<div className="mobile-menu">
				<a href="#menu" className="mobile-menu-link" onClick={handleClose}>
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
