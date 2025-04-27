import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Dialog, OrdersEmpty } from '@components';
import { CardOrder } from '@containers';
import { useEscape } from '@hooks';
import { priceStore } from '@stores';

const Component = () => {
	const navigate = useNavigate();

	const handleClose = () => navigate('/');

	useEscape(handleClose);

	// const items = priceStore.getOrders();

	// return (
	// 	<Dialog title="Заказы" onClose={handleClose}>
	// 		{items ? (
	// 			<div className="orders-list hidescroll">
	// 				{items.map((order, index) => (
	// 					<div key={index} className="order">
	// 						<span className="order-date">
	// 							{new Date(order?.date).toLocaleDateString()}
	// 						</span>

	// 						<div className="order-items">
	// 							{order?.items.map((card, index) => (
	// 								<CardOrder key={index} {...card} onPress={onPress} />
	// 							))}
	// 						</div>

	// 						<span className="order-footer">{`Итого: ${order?.total} ₽`}</span>
	// 					</div>
	// 				))}
	// 			</div>
	// 		) : (
	// 			<OrdersEmpty onClose={onClose} />
	// 		)}
	// 	</Dialog>
	// );

	return null;
};

export const OrdersModal = observer(Component);
