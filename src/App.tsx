// import BasketModal from 'containers/BasketModal';
// import CardModal from 'containers/CardModal';
// import ContactsModal from 'containers/ContactsModal';
// import DeliveryPaymentModal from 'containers/DeliveryPaymentModal';
// import Menu from 'containers/Menu';
// import MobileMenuModal from 'containers/MobileMenuModal';
// import OrdersModal from 'containers/OrdersModal';
import { Fragment, useEffect } from 'react';
import { Provider } from 'mobx-react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Home } from '@components';
import { Header, Menu } from '@containers';
import * as stores from '@stores';

const Layout = () => {
	// const [searchParams] = useSearchParams();
	// const categoryId = searchParams.get('category_id') || null;
	// const id = searchParams.get('card_id') || null;

	useEffect(() => {
		stores.priceStore.getPrice();
	}, []);

	return (
		<Fragment>
			<Header />
			<Home />
			<Menu />
			<Outlet />
		</Fragment>
	);

	// return (
	// 	<Provider {...stores}>
	// 		{/* <Menu /> */}
	// 		{/* {categoryId && id ? <CardModal {...{ categoryId, id }} /> : <Outlet />} */}
	// 		<Outlet />
	// 	</Provider>
	// );
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
			// {
			// 	path: 'contacts',
			// 	Component: ContactsModal,
			// },
		],
	},
]);

const App = () => (
	<Provider {...stores}>
		<RouterProvider router={router} />
	</Provider>
);

export default App;
