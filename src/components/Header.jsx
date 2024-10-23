import { useEffect } from "react";
import { useWindowDimensions } from "hooks";

import "./HeaderMobile.css";
import "./HeaderDesktop.css";

import mobileLogo from "assets/header/logo_250w.png";
import mobileBasket from "assets/header/icon_basket_64w.png";
import mobileBurger from "assets/header/icon_burger_64w.png";

const Header = () => {
  const { isMobile } = useWindowDimensions();

  if (isMobile) return <Mobile />;

  return <Desktop />;
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
  useEffect(() => {
    const headerEl = document.getElementById("header-desktop");

    const onScroll = () => {
      const pos = (document.documentElement || document.body.parentNode || document.body).scrollTop;

      let scroll = Math.round((pos < 200 ? pos : 200) / 4);

      if (headerEl) {
        headerEl.style.backgroundColor = `rgba(255, 255, 255, 0.${scroll < 10 ? "0" + scroll : scroll})`;
        headerEl.style.backdropFilter = `blur(${Math.round((scroll / 10) * 3)}px)`;
      }
    };

    window.addEventListener("scroll", onScroll);
  }, []);

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
