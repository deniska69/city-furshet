import "./CardBasket.css";
import { Icon } from "components";
import imagePlaceholder from "assets/image_placeholder.jpg";

const getCover = (image) => {
  return import.meta.env.DEV || image === "city-furshet.ru/images/image_placeholder.jpg" ? imagePlaceholder : image;
};

const CardBasket = (props) => {
  const { id, image = null, title, subtitle, price = 0, categoryId, count = 0, onPressPlus, onPressMinus } = props;
  return (
    <div className="card-basket">
      <img src={getCover(image)} className="card-basket-image" />

      <div className="card-basket-inner">
        <div className="card-basket-inner-header">
          <div className="card-basket-text">
            <span className="card-title">{title}</span>
            <span className="card-subtitle">{subtitle}</span>
          </div>

          <button className="card-basket-delete-button">
            <Icon name="close" color="gray" size={16} />
          </button>
        </div>

        <div className="card-basket-inner-footer">
          <div className="card-basket-buttons">
            <button className="card-btn-minus" onClick={onPressMinus}>
              <Icon name="minus" color="white" />
            </button>

            <span className="card-basket-counter">{count}</span>

            <button className="card-btn-plus" onClick={onPressPlus}>
              <Icon name="plus" color="white" />
            </button>
          </div>

          <span className="card-basket-total-price">{`${count * price} ₽`}</span>
        </div>
      </div>
    </div>
  );
};

export default CardBasket;
