import "./Card.css";

import minusSvg from "assets/card/minus.svg";
import plusSvg from "assets/card/plus.svg";
import imagePlaceholder from "assets/image_placeholder.jpg";

const Card = (props) => {
  const { id, image = null, title, subtitle, price, categoryId, count } = props;

  const onPressCard = () => props?.onPressCard(categoryId, id);

  const onPressPlus = () => props?.onPressPlus(categoryId, id);

  const onPressMinus = () => props?.onPressMinus(categoryId, id);

  return (
    <div id={id} className="card noselect">
      <div className="card-info" onClick={onPressCard}>
        <img src={image || imagePlaceholder} className="card-image" />
        <span className="card-title">{title}</span>
        <span className="card-subtitle">{subtitle}</span>
      </div>

      <div className="card-buttons">
        {count ? (
          <button id={`${id}-minus`} className="card-btn-minus" onClick={onPressMinus}>
            <img src={minusSvg} />
          </button>
        ) : null}

        <button id={`${id}-plus`} className="card-btn-plus" onClick={onPressPlus}>
          <span className="card-price">{price || "0"} ₽</span>
          <img src={plusSvg} />
        </button>
      </div>
    </div>
  );
};

export default Card;
