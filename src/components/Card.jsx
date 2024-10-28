import "./Card.css";

import minusSvg from "assets/card/minus.svg";
import plusSvg from "assets/card/plus.svg";
import imagePlaceholder from "assets/image_placeholder.jpg";

const getCover = (image) => {
  return import.meta.env.DEV || image === "city-furshet.ru/images/image_placeholder.jpg" ? imagePlaceholder : image;
};

const Card = (props) => {
  const { id, image = null, title, subtitle, price, categoryId, count } = props;

  const onPressCard = () => props?.onPressCard(categoryId, id);

  const onPressPlus = () => props?.onPressPlus(categoryId, id);

  const onPressMinus = () => props?.onPressMinus(categoryId, id);

  return (
    <div id={id} className="card noselect">
      <div className="card-info" onClick={onPressCard}>
        <div className="card-image-wrap">
          <img src={getCover(image)} className="card-image" />

          {count > 0 ? (
            <div className="card-counter-wrap">
              <div className="card-counter-inner">
                <span className="card-counter">{count}</span>
              </div>
            </div>
          ) : null}
        </div>

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
