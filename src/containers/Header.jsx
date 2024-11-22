import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "hooks";

import { HeaderMobile, HeaderDesktop } from "components";

const Header = ({ store }) => {
  const navigate = useNavigate();
  const { isMobile } = useWindowDimensions();

  const basketTotal = store.getBasketTotalCount();

  const onOpenBasket = () => navigate("/basket");

  const onOpenMobileMenu = () => navigate("/mobile-menu");

  const onOpenOrders = () => navigate("/orders");

  const onOpenDelivery = () => navigate("/delivery");

  const onOpenContacts = () => navigate("/contacts");

  if (isMobile) return <HeaderMobile {...{ basketTotal, onOpenBasket, onOpenMobileMenu }} />;

  return <HeaderDesktop {...{ basketTotal, onOpenBasket, onOpenOrders, onOpenDelivery, onOpenContacts }} />;
};

export default inject("store")(observer(Header));
