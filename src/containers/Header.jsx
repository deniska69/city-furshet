import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions.js";
import HeaderMobile from "../components/HeaderMobile.jsx";
import HeaderDesktop from "../components/HeaderDesktop.jsx";

const Header = ({ store }) => {
  // const navigate = useNavigate();
  const { isMobile } = useWindowDimensions();

  const basketTotal = store.getBasketTotalCount();

  const onOpenBasket = () => {
    // navigate("/basket");
  };

  const onOpenMobileMenu = () => {
    // navigate("/mobile-menu")
  };

  const onOpenOrders = () => {
    // navigate("/orders")
  };

  if (isMobile) return <HeaderMobile {...{ basketTotal, onOpenBasket, onOpenMobileMenu, onOpenOrders }} />;

  return <HeaderDesktop {...{ basketTotal, onOpenBasket, onOpenOrders }} />;
};

export default inject("store")(observer(Header));
