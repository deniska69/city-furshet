import { useNavigate } from 'react-router-dom';

import { goBack, scrollToMenu } from '@helpers';
import { Modal } from '@ui';

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
		<Modal title="City Furshet" className="h-min">
			<div className="flex flex-col gap-y-4 p-4">
				<a className="text-2xl text-base" onClick={handleOpenMenu}>
					Меню
				</a>
				<a className="text-2xl text-base" onClick={handleOpenDelivery}>
					Доставка и оплата
				</a>
				<a className="text-2xl text-base" onClick={handleOpenContacts}>
					Контакты
				</a>
				<a className="text-2xl text-base" onClick={handleOpenOrders}>
					Заказы
				</a>
				<a className="text-2xl text-base border-t border-t-border pt-4" onClick={handleClose}>
					Закрыть
				</a>
			</div>
		</Modal>
	);
};
