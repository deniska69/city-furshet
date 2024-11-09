import { Provider } from "mobx-react";
import { RouterProvider, createBrowserRouter, Outlet, useSearchParams } from "react-router-dom";
import * as stores from "stores";

import CardModal from "containers/CardModal";
import BasketModal from "containers/BasketModal";
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
    ],
  },
]);

// const App = () => <RouterProvider router={router} />;

const App = () => {
  // const [searchParams] = useSearchParams();
  // const categoryId = searchParams.get("category_id") || null;
  // const id = searchParams.get("card_id") || null;

  return (
    <Provider {...stores}>
      <Header />
      <Home />
      <Menu />
      {/* {categoryId && id ? <CardModal {...{ categoryId, id }} /> : <Outlet />} */}
    </Provider>
  );
};

export default App;
