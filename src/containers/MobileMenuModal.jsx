import { inject, observer } from "mobx-react";
import { Dialog } from "components";
import "./MobileMenuModal.css";

const MobileMenuModal = ({ modals }) => {
  const isOpen = modals.isOpenMobileMenu;
  const onClose = modals.onCloseMobileMenu;

  if (!isOpen) return null;

  return (
    <Dialog {...{ isOpen, onClose }}>
      <div className="mobile-menu">
        <a href="" className="mobile-menu-link">
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
        <a href="" className="mobile-menu-link">
          Мои заказы
        </a>
        <a className="mobile-menu-link" onClick={onClose}>
          Закрыть
        </a>
      </div>
    </Dialog>
  );
};

export default inject("modals")(observer(MobileMenuModal));
