import "./Menu.css";

import { useWindowDimensions } from "hooks";
import { getPrice } from "services";

const Menu = () => {
  const { isMobile } = useWindowDimensions();

  getPrice();

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
