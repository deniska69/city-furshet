import "./App.css";

import { Header } from "components";
import Home from "containers/Home.jsx";
import Menu from "containers/Menu.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Home />
      <Menu />
    </>
  );
};

export default App;
