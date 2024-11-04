import { Provider } from "mobx-react";
import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import * as stores from "stores";

import BasketModal from "./containers/BasketModal";
import CardModal from "./containers/CardModal";
import Header from "containers/Header.jsx";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";
import MobileMenuModal from "./containers/MobileMenuModal";
import OrdersModal from "./containers/OrdersModal";
import { useEffect } from "react";

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Provider {...stores}>
      <Header />
      <Home />
      <Menu />
      <BasketModal />
      <CardModal />
      <MobileMenuModal />
      <OrdersModal />
    </Provider>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />} />
    </Routes>
  </BrowserRouter>
);

export default App;
