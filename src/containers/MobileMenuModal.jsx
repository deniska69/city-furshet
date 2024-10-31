import { inject, observer } from "mobx-react";
import { Dialog } from "components";
import "./MobileMenuModal.css";

const MobileMenuModal = ({ modals }) => {
  const isOpen = modals.isOpenMobileMenu;
  const onClose = modals.onCloseMobileMenu;

  const onOpenOrders = () => {
    onClose();
    modals.onOpenOrders();
  };

  return (
    <Dialog {...{ isOpen, onClose, title: "City Furshet" }}>
      <div className="mobile-menu">
        <a href="#menu" className="mobile-menu-link" onClick={onClose}>
          Меню
        </a>
        <a href="" className="mobile-menu-link">
          Акции
        </a>
        <a href="" className="mobile-menu-link">
          Доставка и оплата
        </a>
        <a href="" className="mobile-menu-link">
          Контакты
        </a>
        <a className="mobile-menu-link" onClick={onOpenOrders}>
          Заказы
        </a>
        <a className="mobile-menu-link" onClick={onClose}>
          Закрыть
        </a>
      </div>
    </Dialog>
  );
};

export default inject("modals")(observer(MobileMenuModal));
