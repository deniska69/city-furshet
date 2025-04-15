import { useNavigate } from 'react-router-dom';

import { Dialog } from './Dialog';

import '@styles/MobileMenuModal.css';

export const MobileMenuModal = () => {
	const navigate = useNavigate();

	const handleClose = () => navigate('/');

	const handleOpenOrders = () => navigate('/orders');

	const handleOpenDelivery = () => navigate('/delivery');

	const handleOpenContacts = () => navigate('/contacts');

	return (
		<Dialog title="City Furshet">
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
