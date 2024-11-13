import { inject, observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, Icon, Loader } from "components";
import "./CardModal.css";
import imagePlaceholder from "assets/image_placeholder.jpg";

const getCover = (image) => {
  return import.meta.env.DEV || image === "city-furshet.ru/images/image_placeholder.jpg" ? imagePlaceholder : image;
};

const CardModal = ({ id, categoryId, store }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!store?.products?.size) return <Loader />;

  const card = store.getProducts(categoryId, id);

  console.log(card);

  const onClose = () => navigate(location?.pathname);

  const onPressPlus = () => store.onPressPlus(categoryId, id);

  const onPressMinus = () => store.onPressMinus(categoryId, id);

  const onPressCard = () => navigate("/basket");

  if (!card) {
    return (
      <Dialog onClose={onClose}>
        <div className="card-view-empty">
          <Icon color="gray" />
          <span>Ошибка параметров товара.</span>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog title={card?.title} onClose={onClose} size="lg" className="min-content">
      <div className="card-view">
        <img src={getCover(card?.image)} className="card-view-image" />

        <div className="card-view-footer">
          <div className="card-view-text">
            <span className="card-description">{card?.description}</span>
            <span className="card-subtitle">{card?.subtitle}</span>
          </div>

          <div className="card-view-buttons">
            <div className="card-view-buttons-first">
              <button className="card-btn-minus" onClick={onPressMinus}>
                <Icon name="minus" color="white" />
              </button>

              <span className="card-basket-counter">{card?.count || "0"}</span>

              <button className="card-btn-plus" onClick={onPressPlus}>
                <span className="card-price">{card?.price || "0"} ₽</span>
                <Icon name="plus" color="white" />
              </button>
            </div>

            {card?.count ? (
              <button className="card-btn-basket" onClick={onPressCard}>
                <Icon name="basket" color="white" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default inject("store")(observer(CardModal));
