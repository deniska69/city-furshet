import { Provider } from "mobx-react";

import * as stores from "stores";
import { Header } from "components";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";

const App = () => {
  return (
    <Provider {...stores}>
      <Header />
      <Home />
      <Menu />
    </Provider>
  );
};

export default App;
