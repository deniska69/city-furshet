import "./HeaderMobile.css";

import mobileLogo from "assets/header/logo_250w.png";
import mobileBasket from "assets/header/icon_basket_64w.png";
import mobileBurger from "assets/header/icon_burger_64w.png";

const HeaderMobile = ({ basketTotal, onOpenBasket, onOpenMobileMenu }) => (
  <div id="header-mobile" className="noselect">
    <a href="/" id="header-mobile-logo-wrap">
      <img id="header-mobile-logo" src={mobileLogo} alt="logo_white_250w" />
    </a>

    <div id="header-mobile-container" className="hstack gap-x-4">
      <a id="header-mobile-basket-wrap" onClick={onOpenBasket}>
        <img id="header-mobile-basket" src={mobileBasket} alt="icon_basket_64w" />
        {basketTotal ? (
          <div id="header-mobile-basket-badge-wrap">
            <span id="header-mobile-basket-badge-counter">{basketTotal}</span>
          </div>
        ) : null}
      </a>

      <a id="header-mobile-burger-wrap" onClick={onOpenMobileMenu}>
        <img id="header-mobile-burger" src={mobileBurger} alt="icon_burger_64w" />
      </a>
    </div>
  </div>
);

export default HeaderMobile;
