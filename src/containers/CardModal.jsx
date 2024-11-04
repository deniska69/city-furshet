import { inject, observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "components";
import "./CardModal.css";

const CardModal = ({ id, categoryId, store }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const card = store.getProducts(categoryId, id);

  const onClose = () => navigate(location?.pathname);

  console.log(card);

  return (
    <Dialog title={card?.title} onClose={onClose}>
      <div className="card"></div>
    </Dialog>
  );
};

export default inject("store")(observer(CardModal));
