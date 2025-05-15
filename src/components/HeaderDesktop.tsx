import { useEffect } from 'react';

import { cn } from '@helpers';

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
		<div id="header-desktop" className="fixed w-full hidden lg:flex backdrop-blur-none z-10">
			<div className="flex flex-row items-center justify-center w-full lg:w-2/3 lg:ml-[32%] lg:gap-y-12 min-h-(--header-height) gap-x-4">
				<a className="header-desktop-link" onClick={onOpenMenu}>
					Меню
				</a>
				<a className="header-desktop-link" onClick={onOpenDelivery}>
					Доставка и оплата
				</a>
				<a className="header-desktop-link" onClick={onOpenContacts}>
					Контакты
				</a>
				<a
					className="header-desktop-link relative flex flex-row items-center gap-x-1"
					onClick={onOpenBasket}
				>
					<span>Корзина</span>

					<div
						className={cn(
							'rounded-full min-w-6 h-6 flex items-center justify-center bg-secondary transition-all duration-300',
							basketTotal ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
						)}
					>
						<span className="text-white font-semibold text-[1rem] transition-all">
							{basketTotal || 1}
						</span>
					</div>
				</a>
				<a
					className={cn(
						'header-desktop-link transition-all duration-300',
						basketTotal ? '' : 'translate-x-[-24px]',
					)}
					onClick={onOpenOrders}
				>
					Заказы
				</a>
			</div>
		</div>
	);
};
