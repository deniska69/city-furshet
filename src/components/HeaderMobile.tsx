import mobileBasket from '@assets/header/icon_basket_64w.png';
import mobileBurger from '@assets/header/icon_burger_64w.png';
import mobileLogo from '@assets/header/logo_250w.png';

interface IHeaderMobile {
	basketTotal?: string | number;
	onOpenBasket: () => void;
	onOpenMobileMenu: () => void;
}

export const HeaderMobile = (props: IHeaderMobile) => (
	<div className="noselect flex lg:hidden fixed min-h-(--header-height) items-center justify-between w-full backdrop-blur-lg z-10 px-4">
		<a href="/" className="flex items-center active:scale-95 transition-all">
			<img className="w-12 h-12" src={mobileLogo} alt="Логотип" />
		</a>

		<div className="flex flex-row gap-x-4 items-center">
			<div
				className="flex items-center relative active:scale-95 transition-all"
				onClick={props.onOpenBasket}
			>
				<img className="w-12 h-12" src={mobileBasket} alt="Корзина" />

				{props.basketTotal ? (
					<div className="absolute rounded-full bg-secondary w-6 h-6 flex items-center justify-center right-[-5px]">
						<span className="text-white font-semibold leading-4">{props.basketTotal}</span>
					</div>
				) : null}
			</div>

			<img
				className="w-12 h-12 active:scale-95 transition-all"
				src={mobileBurger}
				alt="Бургер меню"
				onClick={props.onOpenMobileMenu}
			/>
		</div>
	</div>
);
