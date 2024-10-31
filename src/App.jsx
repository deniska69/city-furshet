import { Provider } from "mobx-react";
import * as stores from "stores";

import BasketModal from "./containers/BasketModal";
import Header from "containers/Header.jsx";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";
import MobileMenuModal from "./containers/MobileMenuModal";
import OrdersModal from "./containers/OrdersModal";

const App = () => (
  <Provider {...stores}>
    <Header />
    <Home />
    <Menu />
    <BasketModal />
    <MobileMenuModal />
    <OrdersModal />
  </Provider>
);

export default App;
