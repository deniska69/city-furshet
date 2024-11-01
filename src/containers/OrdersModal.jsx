import { inject, observer } from "mobx-react";
import { Dialog } from "components";
import "./OrdersModal.css";

const OrdersModal = ({ store, modals }) => {
  const isOpen = modals.isOpenOrders;
  const onClose = modals.onCloseOrders;
  const orders = store.orders;

  console.log(orders?.length);

  return (
    <Dialog {...{ isOpen, onClose, title: "Заказы" }}>
      <Empty onClose={onClose} />
    </Dialog>
  );
};

export default inject("store", "modals")(observer(OrdersModal));

const Empty = ({ onClose }) => (
  <div className="orders-empty">
    <span>Вы ещё ничего не заказали.</span>
    <a href="#menu" onClick={onClose}>
      Посмотрите, сколько всего вкусного у нас в меню
    </a>
  </div>
);
