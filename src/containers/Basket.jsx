import { inject, observer } from "mobx-react";
import { Dialog, CardBasket, Icon } from "components";
import "./Basket.css";

const Basket = ({ store, isOpen, onClose }) => {
  const items = store.getBasketItems();

  const onPressPlus = (...args) => store.onPressPlus(...args);

  const onPressMinus = (...args) => store.onPressMinus(...args);

  const onPressDelete = (...args) => store.onPressDelete(...args);

  return (
    <Dialog {...{ isOpen, onClose }}>
      <div id="basket">
        <div id="basket-header">
          <span>Корзина</span>
          <button className="basket-header-close" onClick={onClose}>
            <Icon name="close" color="#404040" />
          </button>
        </div>
        <div id="basket-body">
          {items ? (
            items.map((item, index) => (
              <CardBasket key={index} {...item} {...{ onPressPlus, onPressMinus, onPressDelete }} />
            ))
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
