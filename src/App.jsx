import { Provider } from "mobx-react";
import { RouterProvider, createBrowserRouter, Outlet, useSearchParams } from "react-router-dom";
import * as stores from "stores";

import BasketModal from "containers/BasketModal";
import CardModal from "containers/CardModal";
import ContactsModal from "containers/ContactsModal";
import DeliveryPaymentModal from "containers/DeliveryPaymentModal";
import Header from "containers/Header";
import Home from "containers/Home";
import Menu from "containers/Menu";
import MobileMenuModal from "containers/MobileMenuModal";
import OrdersModal from "containers/OrdersModal";

const Root = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id") || null;
  const id = searchParams.get("card_id") || null;

  return (
    <Provider {...stores}>
      <Header />
      <Home />
      <Menu />
      {categoryId && id ? <CardModal {...{ categoryId, id }} /> : <Outlet />}
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "basket",
        Component: BasketModal,
      },
      {
        path: "orders",
        Component: OrdersModal,
      },
      {
        path: "mobile-menu",
        Component: MobileMenuModal,
      },
      {
        path: "delivery",
        Component: DeliveryPaymentModal,
      },
      {
        path: "contacts",
        Component: ContactsModal,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
