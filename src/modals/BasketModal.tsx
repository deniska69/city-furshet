import { FormEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { BasketEmpty, BasketSuccess } from '@components';
import { CardBasket } from '@containers';
import { goBack, scrollToMenu } from '@helpers';
import { basketStore } from '@stores';
import { Modal } from '@ui';

const Component = () => {
	const navigate = useNavigate();

	useEffect(() => {
		basketStore.setOrderStatus(false);
	}, []);

	const items = basketStore.getItems();
	const basketTotalCount = basketStore.getCountTotal();
	const basketTotalPrice = basketStore.getPriceTotal();
	const isSuccessOrder = basketStore.isSuccessOrder;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const contact = formData.get('contact');
		if (contact) basketStore.submit(contact.toString());
	};

	const handleBack = () => {
		navigate(goBack());
		setTimeout(scrollToMenu, 250);
	};

	return (
		<Modal title="Корзина" className="min-content">
			{isSuccessOrder ? <BasketSuccess /> : null}

			{!isSuccessOrder && !items ? <BasketEmpty onClose={handleBack} /> : null}

			{!isSuccessOrder && items ? (
				<div className="basket">
					<div className="basket-body hidescroll">
						{items.map((item, index) => (
							<CardBasket key={index} {...item} />
						))}
					</div>

					{basketTotalCount ? (
						<div className="basket-footer">
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									name="contact"
									required={true}
									className="basket-footer-input"
									placeholder="Телефон или эл.почта"
									value="dev"
								/>
								<input
									type="submit"
									className="basket-footer-submit"
									value={`Заказать ${basketTotalPrice} ₽`}
								/>
							</form>
						</div>
					) : null}
				</div>
			) : null}
		</Modal>
	);
};

export const BasketModal = observer(Component);
