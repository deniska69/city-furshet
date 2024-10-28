import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useWindowDimensions } from "hooks";

import "./HeaderMobile.css";
import "./HeaderDesktop.css";

import mobileLogo from "assets/header/logo_250w.png";
import mobileBasket from "assets/header/icon_basket_64w.png";
import mobileBurger from "assets/header/icon_burger_64w.png";

const Header = ({ store, onOpenBasket }) => {
  const { isMobile } = useWindowDimensions();

  const basketTotal = store.getBasketTotal();

  return (
    <>{isMobile ? <Mobile {...{ basketTotal, onOpenBasket }} /> : <Desktop {...{ basketTotal, onOpenBasket }} />}</>
  );
};

export default inject("store")(observer(Header));

const Mobile = ({ basketTotal, onOpenBasket }) => {
  return (
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

        <a href="" id="header-mobile-burger-wrap">
          <img id="header-mobile-burger" src={mobileBurger} alt="icon_burger_64w" />
        </a>
      </div>
    </div>
  );
};

const Desktop = ({ basketTotal, onOpenBasket }) => {
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

      <a id="header-basket-wrap" onClick={onOpenBasket}>
        <span>Корзина</span>

        <div id="header-basket-badge-wrap" className={!basketTotal ? "hidden" : ""}>
          <span id="header-basket-badge-counter">{basketTotal}</span>
        </div>
      </a>
    </div>
  );
};
