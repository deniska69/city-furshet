import { inject, observer } from "mobx-react";
import { Dialog } from "components";
import "./OrdersModal.css";

const OrdersModal = ({ modals }) => {
  const isOpen = modals.isOpenOrders;
  const onClose = modals.onCloseOrders;

  return (
    <Dialog {...{ isOpen, onClose, title: "Заказы" }}>
      <Empty />
    </Dialog>
  );
};

export default inject("modals")(observer(OrdersModal));

const Empty = () => (
  <div className="orders-empty">
    <span>Вы ещё ничего не заказали</span>
  </div>
);
