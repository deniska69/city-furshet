import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { ordersStore } from 'src/stores/ordersStore';

import { OrdersEmpty } from '@components';
import { CardOrder } from '@containers';
import { goBack, scrollToMenu } from '@helpers';
import { Modal } from '@ui';

const Component = () => {
	const navigate = useNavigate();

	const items = ordersStore.getItems();

	const handleBack = () => {
		navigate(goBack());
		setTimeout(scrollToMenu, 250);
	};

	return (
		<Modal title="Заказы" className="h-min">
			{items && items.length ? (
				<div className="hidescroll flex flex-col h-full p-4 gap-y-4 overflow-y-scroll max-h-[calc(100vh-100px)] min-h-[50vh] lg:max-h-[calc(90vh-100px)]">
					{items.map((order, index) => (
						<div
							key={index}
							className="flex flex-col pb-4 border-b border-b-border border-dotted last:border-none"
						>
							<span className="text-muted mb-4 font-medium text-xl">
								{new Date(order.date).toLocaleDateString()}
							</span>

							<div className="flex flex-col gap-y-4">
								{order?.items.map((card, index) => (
									<CardOrder
										key={index}
										count={card.count}
										productId={card.product_id}
										categoryId={card.category_id}
									/>
								))}
							</div>

							<span className="text-muted self-end text-xl font-medium">{`Итого: ${order.total} ₽`}</span>
						</div>
					))}
				</div>
			) : (
				<OrdersEmpty onClose={handleBack} />
			)}
		</Modal>
	);

	return null;
};

export const OrdersModal = observer(Component);
