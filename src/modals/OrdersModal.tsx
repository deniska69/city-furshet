import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { ordersStore } from 'src/stores/ordersStore';

import { Dialog, OrdersEmpty } from '@components';
import { CardOrder } from '@containers';
import { useEscape } from '@hooks';

const Component = () => {
	const navigate = useNavigate();

	const handleClose = () => navigate('/');

	useEscape(handleClose);

	const items = ordersStore.getItems();

	return (
		<Dialog title="Заказы" onClose={handleClose} className="min-content">
			{items && items.length ? (
				<div className="orders-list hidescroll">
					{items.map((order, index) => (
						<div key={index} className="order">
							<span className="order-date">{new Date(order.date).toLocaleDateString()}</span>

							<div className="order-items">
								{order?.items.map((card, index) => (
									<CardOrder
										key={index}
										count={card.count}
										productId={card.product_id}
										categoryId={card.category_id}
									/>
								))}
							</div>

							<span className="order-footer">{`Итого: ${order.total} ₽`}</span>
						</div>
					))}
				</div>
			) : (
				<OrdersEmpty onClose={handleClose} />
			)}
		</Dialog>
	);

	return null;
};

export const OrdersModal = observer(Component);
