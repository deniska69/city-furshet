import { Provider } from "mobx-react";
import * as stores from "stores";

import Basket from "containers/Basket";
import Header from "containers/Header.jsx";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";

const App = () => (
  <Provider {...stores}>
    <Header />
    <Home />
    <Menu />
    <Basket />
  </Provider>
);

export default App;
