import { useEffect } from 'react';

import { ThemeWidget } from './ThemeWidget';

interface IHeaderDesktop {
	basketTotal?: string | number;
	onOpenMenu: () => void;
	onOpenDelivery: () => void;
	onOpenContacts: () => void;
	onOpenBasket: () => void;
	onOpenOrders: () => void;
}

export const HeaderDesktop = (props: IHeaderDesktop) => {
	const { basketTotal, onOpenMenu, onOpenBasket, onOpenOrders, onOpenDelivery, onOpenContacts } =
		props;

	useEffect(() => {
		const headerEl = document.getElementById('header-desktop-scroll');

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
		<div
			id="header-desktop-scroll"
			className="noselect fixed min-h-20 hidden md:!flex items-center justify-end gap-x-1 backdrop-blur-none z-100 flex-row dev w-full"
		>
			<a onClick={onOpenMenu}>Меню</a>
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
			<ThemeWidget />
		</div>
	);
};
