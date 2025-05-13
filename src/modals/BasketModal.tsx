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
				<div className="flex flex-col h-full min-h-[50vh] lg:max-h-[calc(90vh-100px)] max-h-[calc(100vh - 250px)] justify-between">
					<div className="flex flex-col h-full p-4 gap-y-4 overflow-y-scroll hidescroll">
						{items.map((item, index) => (
							<CardBasket key={index} {...item} />
						))}
					</div>

					{basketTotalCount ? (
						<div>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-y-4 p-4 border-t border-t-border"
							>
								<input
									type="text"
									name="contact"
									required={true}
									placeholder="Телефон или эл.почта"
									className="rounded-lg h-10 w-full text-base placeholder:text-base/60 border border-border py-1 px-2.5 text-lg"
								/>
								<input
									type="submit"
									value={`Заказать ${basketTotalPrice} ₽`}
									className="bg-primary hover:bg-primary/80 active:bg-primary/80 transition-all active:scale-[98%] text-lg rounded-lg text-white p-5 hover:cursor-pointer"
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
