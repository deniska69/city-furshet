import { useEffect } from 'react';

import './HeaderDesktop.css';

interface IHeaderDesktop {
	basketTotal?: string | number;
	onOpenDelivery: () => void;
	onOpenContacts: () => void;
	onOpenBasket: () => void;
	onOpenOrders: () => void;
}

export const HeaderDesktop = (props: IHeaderDesktop) => {
	const { basketTotal, onOpenBasket, onOpenOrders, onOpenDelivery, onOpenContacts } = props;

	useEffect(() => {
		const headerEl = document.getElementById('header-desktop');

		const onScroll = () => {
			const pos = (document.documentElement || document.body.parentNode || document.body)
				.scrollTop;

			let scroll = Math.round((pos < 200 ? pos : 200) / 4);

			if (headerEl) {
				headerEl.style.backgroundColor = `rgba(255, 255, 255, 0.${scroll < 10 ? '0' + scroll : scroll})`;
				headerEl.style.backdropFilter = `blur(${Math.round((scroll / 10) * 3)}px)`;
			}
		};

		window.addEventListener('scroll', onScroll);
	}, []);

	return (
		<div id="header-desktop" className="noselect">
			<a href="#menu">Меню</a>
			<a onClick={onOpenDelivery}>Доставка и оплата</a>
			<a onClick={onOpenContacts}>Контакты</a>
			<a id="header-basket-wrap" onClick={onOpenBasket}>
				<span>Корзина</span>

				{basketTotal ? (
					<div id="header-basket-badge-wrap">
						<span id="header-basket-badge-counter">{basketTotal}</span>
					</div>
				) : null}
			</a>

			<a onClick={onOpenOrders}>Заказы</a>
		</div>
	);
};
