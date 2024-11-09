import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog.jsx";
import CardBasket from "../components/CardBasket.jsx";
import Loader from "../components/Loader.jsx";
import "./BasketModal.css";

const BasketModal = ({ store }) => {
  // const navigate = useNavigate();

  useEffect(() => {
    store.isSuccessOrder = false;
  }, [store]);

  const onClose = () => {
    // navigate("/")
  };

  const items = store.getBasketItems();
  const basketTotalCount = store.getBasketTotalCount();
  const basketTotalPrice = store.getBasketTotalPrice();
  const isSuccessOrder = store.isSuccessOrder;

  const onPressCard = (categoryId, id) => {
    // navigate(`?category_id=${categoryId}&card_id=${id}`)
  };

  const onPressPlus = (...args) => store.onPressPlus(...args);

  const onPressMinus = (...args) => store.onPressMinus(...args);

  const onPressDelete = (...args) => store.onPressDelete(...args);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    store.onSubmit(formData.get("contact"));
  };

  return (
    <Dialog title="Корзина">
      <div className="basket">
        {isSuccessOrder ? null : (
          <div className="basket-body  hidescroll">
            {items ? (
              items.map((item, index) => (
                <CardBasket key={index} {...item} {...{ onPressCard, onPressPlus, onPressMinus, onPressDelete }} />
              ))
            ) : (
              <Empty onClose={onClose} />
            )}
          </div>
        )}

        {isSuccessOrder ? null : basketTotalCount ? (
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

        {isSuccessOrder ? <Success /> : null}
      </div>
    </Dialog>
  );
};

export default inject("store")(observer(BasketModal));

const Empty = ({ onClose }) => (
  <div className="basket-empty">
    <span>Вы ещё ничего не выбрали.</span>
    <a href="#menu" onClick={onClose}>
      Посмотрите, сколько всего вкусного у нас в меню 👈
    </a>
  </div>
);

const Success = () => (
  <div className="basket-success">
    <Loader />
    <span>
      Отлично!
      <br />
      Мы уже получили ваш заказ и скоро с Вами свяжемся!
    </span>
  </div>
);
