import "./Menu.css";

import { useWindowDimensions } from "hooks";
import { getPrice } from "services";
import { usePapaParse } from "react-papaparse";

const Menu = () => {
  const { isMobile } = useWindowDimensions();
  const { readRemoteFile } = usePapaParse();

  const url = import.meta.env.VITE_PRICE_URL;

  console.log(url);

  console.log("");

  readRemoteFile(url, {
    complete: (results) => {
      console.log("---------------------------");
      console.log("Results:", results);
      console.log("---------------------------");
    },
  });

  return (
    <div id="menu">
      <div className="menu-container">
        {isMobile ? <CategoriesMobile /> : <CategoriesDesktop />}
        <MenuMain />
      </div>
    </div>
  );
};

export default Menu;

const CategoriesMobile = () => <div id="menu-categories-mobile"></div>;

const CategoriesDesktop = () => <div id="menu-categories-desktop"></div>;

const MenuMain = () => <div id="menu-main"></div>;
