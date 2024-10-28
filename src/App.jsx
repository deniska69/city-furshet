import { Provider } from "mobx-react";
import { useOpen } from "hooks";

import * as stores from "stores";
import { Header } from "components";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";
import Basket from "containers/Basket";

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
