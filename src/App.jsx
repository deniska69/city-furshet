import { Provider } from "mobx-react";
import { useOpen } from "hooks";
import * as stores from "stores";

import Basket from "containers/Basket";
import Header from "containers/Header.jsx";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";

const App = () => {
  const { isOpen, onOpen, onClose } = useOpen();

  return (
    <Provider {...stores}>
      <Header onOpenBasket={onOpen} />
      <Home />
      <Menu onOpenBasket={onOpen} />
      <Basket {...{ isOpen, onClose }} />
    </Provider>
  );
};

export default App;
