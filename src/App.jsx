import { Provider } from "mobx-react";
import { RouterProvider, createBrowserRouter, Outlet, useSearchParams } from "react-router-dom";
import * as stores from "./stores";

import CardModal from "./containers/CardModal.jsx";
import BasketModal from "./containers/BasketModal.jsx";
import Header from "./containers/Header.jsx";
import Home from "./containers/Home.jsx";
import Menu from "./containers/Menu.jsx";
import MobileMenuModal from "./containers/MobileMenuModal.jsx";
import OrdersModal from "./containers/OrdersModal.jsx";

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
