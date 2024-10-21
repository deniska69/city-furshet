import "./HeaderMobile.css";
import "./HeaderDesktop.css";

import mobileLogo from "assets/header/logo_250w.png";
import mobileBasket from "assets/header/icon_basket_64w.png";
import mobileBurger from "assets/header/icon_burger_64w.png";

import { useWindowDimensions } from "hooks";

const Header = () => {
  const { width } = useWindowDimensions();

  if (width > 1279) return <Desktop />;

  return <Mobile />;
};

export default Header;

const Mobile = () => {
  return (
    <div id="header-mobile" className="noselect">
      <a href="/" id="header-mobile-logo-wrap">
        <img id="header-mobile-logo" src={mobileLogo} alt="logo_white_250w" />
      </a>

      <div id="header-mobile-container" className="hstack gap-x-4">
        <a id="header-mobile-basket-wrap">
          <img id="header-mobile-basket" src={mobileBasket} alt="icon_basket_64w" />
          <div id="header-mobile-basket-badge-wrap" className="hide">
            <span id="header-mobile-basket-badge-counter">0</span>
          </div>
        </a>

        <a href="" id="header-mobile-burger-wrap">
          <img id="header-mobile-burger" src={mobileBurger} alt="icon_burger_64w" />
        </a>
      </div>
    </div>
  );
};

const Desktop = () => {
  return (
    <div id="header-desktop" className="noselect">
      <a href="#menu">Меню</a>
      <a href="">Акции</a>
      <a href="">Доставка и оплата</a>
      <a href="">Контакты</a>
      <a id="header-basket-wrap">
        <span>Корзина</span>
        <div id="header-basket-badge-wrap" className="hide">
          <span id="header-basket-badge-counter">0</span>
        </div>
      </a>
    </div>
  );
};
