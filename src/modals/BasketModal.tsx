import { FormEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { BasketEmpty, BasketSuccess, Dialog } from '@components';
import { CardBasket } from '@containers';
import { useEscape } from '@hooks';
import { basketStore } from '@stores';

const Component = () => {
	const navigate = useNavigate();

	useEffect(() => {
		basketStore.setOrderStatus(false);
	}, []);

	const handleClose = () => navigate('/');

	useEscape(handleClose);

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

	return (
		<Dialog title="Корзина" onClose={handleClose}>
			<div className="basket">
				{isSuccessOrder ? null : (
					<div className="basket-body  hidescroll">
						{items ? (
							items.map((item, index) => <CardBasket key={index} {...item} />)
						) : (
							<BasketEmpty onClose={handleClose} />
						)}
					</div>
				)}

				{isSuccessOrder ? null : basketTotalCount ? (
					<div className="basket-footer">
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								name="contact"
								required={true}
								className="basket-footer-input"
								placeholder="Телефон или эл.почта"
							/>
							<input
								type="submit"
								className="basket-footer-submit"
								value={`Заказать ${basketTotalPrice} ₽`}
							/>
						</form>
					</div>
				) : null}

				{isSuccessOrder ? <BasketSuccess /> : null}
			</div>
		</Dialog>
	);
};

export const BasketModal = observer(Component);
