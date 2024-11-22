import { useNavigate } from "react-router-dom";
import { Dialog } from "components";
import "./MobileMenuModal.css";

const MobileMenuModal = () => {
  const navigate = useNavigate();

  const onClose = () => navigate("/");

  const onOpenOrders = () => navigate("/orders");

  const onOpenDelivery = () => navigate("/delivery");

  const onOpenContacts = () => navigate("/contacts");

  return (
    <Dialog title="City Furshet">
      <div className="mobile-menu">
        <a href="#menu" className="mobile-menu-link" onClick={onClose}>
          Меню
        </a>
        <a className="mobile-menu-link" onClick={onOpenDelivery}>
          Доставка и оплата
        </a>
        <a className="mobile-menu-link" onClick={onOpenContacts}>
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

export default MobileMenuModal;
