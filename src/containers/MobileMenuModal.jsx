import { useNavigate } from "react-router-dom";
import { Dialog } from "components";
import "./MobileMenuModal.css";

const MobileMenuModal = () => {
  const navigate = useNavigate();

  const onClose = () => navigate("/");

  const onOpenOrders = () => navigate("/orders");

  return (
    <Dialog title="City Furshet">
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

export default MobileMenuModal;
