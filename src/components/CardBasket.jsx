import "./CardBasket.css";

import minusSvg from "assets/card/minus.svg";
import plusSvg from "assets/card/plus.svg";
import imagePlaceholder from "assets/image_placeholder.jpg";

const getCover = (image) => {
  return import.meta.env.DEV || image === "city-furshet.ru/images/image_placeholder.jpg" ? imagePlaceholder : image;
};

const CardBasket = (props) => {
  const { id, image = null, title, subtitle, price, categoryId, count, onPressPlus, onPressMinus } = props;
  return (
    <div className="card-basket">
      <img src={getCover(image)} className="card-basket-image" />

      <div className="card-basket-inner">
        <div className="card-basket-text">
          <span className="card-title">{title}</span>
          <span className="card-subtitle">{subtitle}</span>
        </div>

        <div className="card-basket-buttons">
          <button className="card-btn-minus" onClick={onPressMinus}>
            <img src={minusSvg} />
          </button>

          <button className="card-btn-plus" onClick={onPressPlus}>
            <span className="card-price">{price || "0"} ₽</span>
            <img src={plusSvg} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBasket;
