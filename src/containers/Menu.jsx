import "./Menu.css";

import { useWindowDimensions } from "hooks";

const Menu = () => {
  const { isMobile } = useWindowDimensions();

  console.log(import.meta.env.VITE_PRICE_URL);

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
