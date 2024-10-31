import { inject, observer } from "mobx-react";
import { Dialog, CardBasket } from "components";
import "./BasketModal.css";

const BasketModal = ({ store, modals }) => {
  const isOpen = modals.isOpenBasket;
  const onClose = modals.onCloseBasket;
  const items = store.getBasketItems();

  const basketTotalCount = store.getBasketTotalCount();
  const basketTotalPrice = store.getBasketTotalPrice();

  const onPressPlus = (...args) => store.onPressPlus(...args);

  const onPressMinus = (...args) => store.onPressMinus(...args);

  const onPressDelete = (...args) => store.onPressDelete(...args);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    store.onSubmit(formData.get("contact"));
  };

  return (
    <Dialog {...{ isOpen, onClose, title: "Корзина" }}>
      <div className="basket">
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

export default inject("store", "modals")(observer(BasketModal));

const Empty = () => (
  <div className="basket-empty">
    <span>Вы ещё ничего не выбрали</span>
  </div>
);
