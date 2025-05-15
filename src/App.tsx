import { Fragment, useEffect } from 'react';
import { Provider } from 'mobx-react';
import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
	useSearchParams,
} from 'react-router-dom';

import { Home } from '@components';
import { Header, Menu } from '@containers';
import {
	BasketModal,
	CardModal,
	ContactsModal,
	DeliveryPaymentModal,
	MobileMenuModal,
	OrdersModal,
} from '@modals';
import * as stores from '@stores';

const Layout = () => {
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	const isCard = searchParams.get('modal') === 'card';
	const isBasket = searchParams.get('modal') === 'basket';
	const isOrders = searchParams.get('modal') === 'orders';
	const isMobileMenu = searchParams.get('modal') === 'mobile_menu';
	const isDelivery = searchParams.get('modal') === 'delivery';
	const isContacts = searchParams.get('modal') === 'contacts';

	useEffect(() => {
		stores.priceStore.getPrice();
		stores.basketStore.restoreBasketFromStore();
	}, []);

	const handleOpenModal = (modal: string, categoryId?: string, productId?: string) => {
		setSearchParams(location.search);

		const category = searchParams.get('category_id');
		const card = searchParams.get('card_id');

		const categoryParam = categoryId
			? { category_id: categoryId }
			: category
				? { category_id: category }
				: undefined;

		const cardParam = productId ? { card_id: productId } : card ? { card_id: card } : undefined;

		setSearchParams({
			...categoryParam,
			...(modal === 'card' && cardParam),
			modal,
		});
	};

	const handleOpenBasket = () => handleOpenModal('basket');

	const handleOpenOrders = () => handleOpenModal('orders');

	const handleOpenMobileMenu = () => handleOpenModal('mobile_menu');

	const handleOpenDelivery = () => handleOpenModal('delivery');

	const handleOpenContacts = () => handleOpenModal('contacts');

	const handleOpenCard = (categoryId: string, productId: string) => {
		handleOpenModal('card', categoryId, productId);
	};

	return (
		<Fragment>
			<Header
				onOpenOrders={handleOpenOrders}
				onOpenBasket={handleOpenBasket}
				onOpenContacts={handleOpenContacts}
				onOpenDelivery={handleOpenDelivery}
				onOpenMobileMenu={handleOpenMobileMenu}
			/>
			<Home />
			<Menu onOpenCard={handleOpenCard} />

			{isCard ? (
				<CardModal
					categoryId={searchParams.get('category_id')}
					productId={searchParams.get('card_id')}
				/>
			) : null}
			{isBasket ? <BasketModal /> : null}
			{isOrders ? <OrdersModal /> : null}
			{isMobileMenu ? <MobileMenuModal /> : null}
			{isDelivery ? <DeliveryPaymentModal /> : null}
			{isContacts ? <ContactsModal /> : null}
		</Fragment>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
	},
]);

const App = () => (
	<Provider {...stores}>
		<RouterProvider router={router} />
	</Provider>
);

export default App;
