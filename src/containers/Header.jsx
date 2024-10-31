import { inject, observer } from "mobx-react";
import { useWindowDimensions } from "hooks";

import { HeaderMobile, HeaderDesktop } from "components";

const Header = ({ store, modals }) => {
  const { isMobile } = useWindowDimensions();

  const basketTotal = store.getBasketTotalCount();
  const onOpenBasket = modals.onOpenBasket;
  const onOpenMobileMenu = modals.onOpenMobileMenu;
  const onOpenOrders = modals.onOpenOrders;

  if (isMobile) return <HeaderMobile {...{ basketTotal, onOpenBasket, onOpenMobileMenu, onOpenOrders }} />;

  return <HeaderDesktop {...{ basketTotal, onOpenBasket, onOpenOrders }} />;
};

export default inject("store", "modals")(observer(Header));
