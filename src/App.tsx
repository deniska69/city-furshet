// import BasketModal from 'containers/BasketModal';
// import ContactsModal from 'containers/ContactsModal';
// import DeliveryPaymentModal from 'containers/DeliveryPaymentModal';
// import Menu from 'containers/Menu';
// import MobileMenuModal from 'containers/MobileMenuModal';
// import OrdersModal from 'containers/OrdersModal';
import { Fragment, useEffect } from 'react';
import { CardModal } from '@modals';
import { Provider } from 'mobx-react';
import { createBrowserRouter, Outlet, RouterProvider, useSearchParams } from 'react-router-dom';

import { ContactsModal, Home } from '@components';
import { Header, Menu } from '@containers';
import * as stores from '@stores';

const Layout = () => {
	const [searchParams] = useSearchParams();
	const categoryId = searchParams.get('category_id') || null;
	const productId = searchParams.get('card_id') || null;

	useEffect(() => {
		stores.priceStore.getPrice();
	}, []);

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
			// {
			// 	path: 'basket',
			// 	Component: BasketModal,
			// },
			// {
			// 	path: 'orders',
			// 	Component: OrdersModal,
			// },
			// {
			// 	path: 'mobile-menu',
			// 	Component: MobileMenuModal,
			// },
			// {
			// 	path: 'delivery',
			// 	Component: DeliveryPaymentModal,
			// },
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
