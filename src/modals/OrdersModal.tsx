import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { ordersStore } from 'src/stores/ordersStore';

import { Dialog, OrdersEmpty } from '@components';
import { CardOrder } from '@containers';
import { goBack, scrollToMenu } from '@helpers';

const Component = () => {
	const navigate = useNavigate();

	const items = ordersStore.getItems();

	const handleBack = () => {
		navigate(goBack());
		setTimeout(scrollToMenu, 250);
	};

	return (
		<Dialog title="Заказы" className="min-content">
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
				<OrdersEmpty onClose={handleBack} />
			)}
		</Dialog>
	);

	return null;
};

export const OrdersModal = observer(Component);
