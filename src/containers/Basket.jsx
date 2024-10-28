import { useRef, useEffect } from "react";

import "./Basket.css";

const Basket = ({ isOpen, onClose }) => {
  const refDialog = useRef(null);

  useEffect(() => {
    if (isOpen) {
      refDialog.current?.showModal();
      document.body.classList.add("modal-open");
    } else {
      refDialog.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  return (
    <dialog ref={refDialog} id="dialog-mobile-menu">
      <div className="stack">
        <h1>Корзина</h1>

        <div id="dialog-mobile-menu-list">
          <a href="#price-block" className="dialog-mobile-menu-link">
            Цены
          </a>
          <a href="#reviews" className="dialog-mobile-menu-link">
            Отзывы
          </a>
          <a href="#contacts" className="dialog-mobile-menu-link">
            Контакты
          </a>
        </div>

        <button id="dialog-mobile-menu-close-btn">Закрыть</button>
      </div>
    </dialog>
  );
};

export default Basket;
