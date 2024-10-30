import { inject, observer } from "mobx-react";
import { Dialog, CardBasket, Icon } from "components";
import { sendTelegram } from "services";
import "./Basket.css";

const Basket = ({ store, isOpen, onClose }) => {
  const items = store.getBasketItems();

  const basketTotalCount = store.getBasketTotalCount();
  const basketTotalPrice = store.getBasketTotalPrice();

  const onPressPlus = (...args) => store.onPressPlus(...args);

  const onPressMinus = (...args) => store.onPressMinus(...args);

  const onPressDelete = (...args) => store.onPressDelete(...args);

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const contact = formData.get("contact");

    sendTelegram(contact)
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  };

  return (
    <Dialog {...{ isOpen, onClose }}>
      <div className="basket">
        <div className="basket-header">
          <span>Корзина</span>
          <button className="basket-header-close" onClick={onClose}>
            <Icon name="close" color="#404040" />
          </button>
        </div>

        <div className="basket-body">
          {items ? (
            items.map((item, index) => (
              <CardBasket key={index} {...item} {...{ onPressPlus, onPressMinus, onPressDelete }} />
            ))
          ) : (
            <Empty />
          )}
        </div>

        {basketTotalCount ? (
          <div className="basket-footer">
            <form onSubmit={onSubmit}>
              <input
                className="basket-footer-input"
                type="text"
                name="contact"
                required={true}
                placeholder="Телефон или эл.почта"
              />
              <input className="basket-footer-submit" type="submit" value={`Заказать ${basketTotalPrice} ₽`} />
            </form>
          </div>
        ) : null}
      </div>
    </Dialog>
  );
};

export default inject("store")(observer(Basket));

const Empty = () => (
  <div className="basket-empty">
    <span>Вы ещё ничего не выбрали</span>
  </div>
);
