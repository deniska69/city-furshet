import { inject, observer } from "mobx-react";
import { useWindowDimensions } from "hooks";

import { HeaderMobile, HeaderDesktop } from "components";

const Header = ({ store, onOpenBasket }) => {
  const { isMobile } = useWindowDimensions();

  const basketTotal = store.getBasketTotalCount();

  if (isMobile) return <HeaderMobile {...{ basketTotal, onOpenBasket }} />;

  return <HeaderDesktop {...{ basketTotal, onOpenBasket }} />;
};

export default inject("store")(observer(Header));
