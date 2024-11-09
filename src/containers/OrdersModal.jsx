import { inject, observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Dialog, CardOrder } from "components";
import "./OrdersModal.css";

const OrdersModal = ({ store }) => {
  // const navigate = useNavigate();

  const orders = store.orders;

  const onClose = () => {
    // navigate("/")
  };

  const onPress = (categoryId, id) => {
    // navigate(`?category_id=${categoryId}&card_id=${id}`)
  };

  return (
    <Dialog title="Заказы">
      {orders?.length ? (
        <div className="orders-list hidescroll">
          {orders.map((order, index) => (
            <div key={index} className="order">
              <span className="order-date">{new Date(order?.date).toLocaleDateString()}</span>

              <div className="order-items">
                {order?.items.map((card, index) => (
                  <CardOrder key={index} {...card} onPress={onPress} />
                ))}
              </div>

              <span className="order-footer">{`Итого: ${order?.total} ₽`}</span>
            </div>
          ))}
        </div>
      ) : (
        <Empty onClose={onClose} />
      )}
    </Dialog>
  );
};

export default inject("store")(observer(OrdersModal));

const Empty = ({ onClose }) => (
  <div className="orders-empty">
    <span>Вы ещё ничего не заказали.</span>
    <a href="#menu" onClick={onClose}>
      Посмотрите, сколько всего вкусного у нас в меню 👈
    </a>
  </div>
);
