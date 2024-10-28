import { inject, observer } from "mobx-react";
import { Dialog } from "components";

import closeSvg from "assets/header/close.svg";
import "./Basket.css";

const Basket = ({ store, isOpen, onClose }) => {
  return (
    <Dialog {...{ isOpen, onClose }}>
      <div id="basket">
        <div id="basket-header">
          <h1>Корзина</h1>
          <button onClick={onClose}>
            <img src={closeSvg} />
          </button>
        </div>
        <div id="basket-body">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <div id="basket-footer">
          <span>Футер</span>
        </div>
      </div>
    </Dialog>
  );
};

export default inject("store")(observer(Basket));
