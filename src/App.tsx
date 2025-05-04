import { Fragment, useEffect } from 'react';
import {
	BasketModal,
	CardModal,
	ContactsModal,
	DeliveryPaymentModal,
	MobileMenuModal,
	OrdersModal,
} from '@modals';
import { Provider } from 'mobx-react';
import { createBrowserRouter, Outlet, RouterProvider, useSearchParams } from 'react-router-dom';

import { Home } from '@components';
import { Header, Menu } from '@containers';
import { scrollToMenu } from '@helpers';
import * as stores from '@stores';

const Layout = () => {
	const [searchParams] = useSearchParams();
	const categoryId = searchParams.get('category_id') || null;
	const productId = searchParams.get('card_id') || null;

	useEffect(() => {
		stores.priceStore.getPrice();
		stores.basketStore.restoreBasketFromStore();
	}, []);

	useEffect(() => {
		if (categoryId && !productId) scrollToMenu(250);
	}, [categoryId, productId]);

	return (
		<Fragment>
			<Header />
			<Home />
			<Menu />
			{categoryId && productId ? <CardModal {...{ categoryId, productId }} /> : <Outlet />}
		</Fragment>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		children: [
			{
				path: 'basket',
				Component: BasketModal,
			},
			{
				path: 'orders',
				Component: OrdersModal,
			},
			{
				path: 'mobile-menu',
				Component: MobileMenuModal,
			},
			{
				path: 'delivery',
				Component: DeliveryPaymentModal,
			},
			{
				path: 'contacts',
				Component: ContactsModal,
			},
		],
	},
]);

const App = () => (
	<Provider {...stores}>
		<RouterProvider router={router} />
	</Provider>
);

export default App;
