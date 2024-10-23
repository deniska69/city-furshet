import "./Card.css";

import minusSvg from "assets/card/minus.svg";
import plusSvg from "assets/card/plus.svg";
import imagePlaceholder from "assets/image_placeholder.jpg";

const Card = ({ id, image = null, title, subtitle, price }) => {
  return (
    <div id={id} className="card noselect">
      <div className="card-info">
        <img src={image || imagePlaceholder} className="card-image" />
        <span className="card-title">{title}</span>
        <span className="card-subtitle">{subtitle}</span>
      </div>

      <div className="card-buttons">
        <button id={`{card?.id}-minus`} className="card-btn-minus hide">
          <img src={minusSvg} />
        </button>

        <button id={`${id}-plus`} className="card-btn-plus">
          <span className="card-price">{price || "0"} ₽</span>
          <img src={plusSvg} />
        </button>
      </div>
    </div>
  );
};

export default Card;
