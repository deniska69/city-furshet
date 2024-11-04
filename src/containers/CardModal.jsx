import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Dialog } from "components";
import "./CardModal.css";

const CardModal = ({ store, modals }) => {
  const isOpen = modals.isOpenCard;
  const onClose = modals.onCloseCard;
  const onOpen = modals.onOpenCard;

  const hash = window?.location?.hash;

  // useEffect(() => {
  //   window.addEventListener("hashchange", function () {
  //     console.log("Ура, хэш изменился!:", location.hash);
  //   });
  // }, []);

  useEffect(() => {
    console.log("Ура, хэш изменился!:", location.hash);
  }, [location.hash]);

  return (
    <Dialog {...{ isOpen, onClose }}>
      <Empty />
    </Dialog>
  );
};

export default inject("store", "modals")(observer(CardModal));

const Empty = () => (
  <div className="orders-empty">
    <span>Неверные параметры товара.</span>
  </div>
);
