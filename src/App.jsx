import { Provider } from "mobx-react";
import { Drawer } from "vaul";
import { useOpen } from "hooks";

import * as stores from "stores";
import { Header } from "components";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";

const App = () => {
  const { isOpen, onOpen, OnClose } = useOpen();

  return (
    <Provider {...stores}>
      <Header onOpenBasket={onOpen} />
      <Home />
      <Menu />
    </Provider>
  );
};

export default App;
