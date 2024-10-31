import { inject, observer } from "mobx-react";
import { Dialog } from "components";
import "./OrdersModal.css";

const OrdersModal = ({ modals }) => {
  const isOpen = modals.isOpenOrders;
  const onClose = modals.onCloseOrders;

  if (!isOpen) return null;

  return (
    <Dialog {...{ isOpen, onClose }}>
      <div className="mobile-menu">
        <h1>Заказы</h1>
      </div>
    </Dialog>
  );
};

export default inject("modals")(observer(OrdersModal));
