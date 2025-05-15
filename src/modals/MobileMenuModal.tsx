import { useNavigate } from 'react-router-dom';

import { goBack, scrollToMenu } from '@helpers';
import { Modal } from '@ui';

interface IMobileMenuModal {
	onOpenBasket: () => void;
	onOpenOrders: () => void;
	onOpenDelivery: () => void;
	onOpenContacts: () => void;
}

export const MobileMenuModal = (props: IMobileMenuModal) => {
	const { onOpenOrders, onOpenContacts, onOpenDelivery, onOpenBasket } = props;

	const navigate = useNavigate();

	const handleOpenMenu = () => {
		navigate(goBack());
		setTimeout(scrollToMenu, 250);
	};

	const handleClose = () => navigate(goBack());

	return (
		<Modal title="City Furshet" className="h-min">
			<div className="flex flex-col gap-y-4 p-4">
				<a className="text-2xl text-base" onClick={handleOpenMenu}>
					Меню
				</a>
				<a className="text-2xl text-base" onClick={onOpenDelivery}>
					Доставка и оплата
				</a>
				<a className="text-2xl text-base" onClick={onOpenContacts}>
					Контакты
				</a>
				<a className="text-2xl text-base" onClick={onOpenBasket}>
					Корзина
				</a>
				<a className="text-2xl text-base" onClick={onOpenOrders}>
					Заказы
				</a>
				<a className="text-2xl text-base border-t border-t-border pt-4" onClick={handleClose}>
					Закрыть
				</a>
			</div>
		</Modal>
	);
};
