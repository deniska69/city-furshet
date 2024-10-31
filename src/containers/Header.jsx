import { inject, observer } from "mobx-react";
import { useWindowDimensions } from "hooks";

import { HeaderMobile, HeaderDesktop } from "components";

const Header = ({ store, modals }) => {
  const { isMobile } = useWindowDimensions();

  const basketTotal = store.getBasketTotalCount();
  const onOpenBasket = modals.onOpenBasket;
  const onOpenMobileMenu = modals.onOpenMobileMenu;
  const onOpenMyOrders = modals.onOpenMyOrders;

  if (isMobile) return <HeaderMobile {...{ basketTotal, onOpenBasket, onOpenMobileMenu, onOpenMyOrders }} />;

  return <HeaderDesktop {...{ basketTotal, onOpenBasket, onOpenMyOrders }} />;
};

export default inject("store", "modals")(observer(Header));
