import { inject, observer } from "mobx-react";
import { Dialog, CardBasket } from "components";

import closeSvg from "assets/header/close.svg";
import "./Basket.css";

const Basket = ({ store, isOpen, onClose }) => {
  const items = store.getBasketItems();

  const onPressPlus = (...args) => store.onPressPlus(...args);

  const onPressMinus = (...args) => store.onPressMinus(...args);

  return (
    <Dialog {...{ isOpen, onClose }}>
      <div id="basket">
        <div id="basket-header">
          <span>Корзина</span>
          <button onClick={onClose}>
            <img src={closeSvg} />
          </button>
        </div>
        <div id="basket-body">
          {items ? (
            items.map((item, index) => <CardBasket key={index} {...item} {...{ onPressPlus, onPressMinus }} />)
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default inject("store")(observer(Basket));

const Empty = () => (
  <div id="basket-empty">
    <span>Вы ещё ничего не выбрали</span>
  </div>
);
