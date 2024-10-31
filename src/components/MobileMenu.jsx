import Dialog from "./Dialog";

const MobileMenu = ({ isOpen, onClose }) => {
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
        <a href="" className="mobile-menu-link">
          Закрыть
        </a>
      </div>
    </Dialog>
  );
};

export default MobileMenu;
