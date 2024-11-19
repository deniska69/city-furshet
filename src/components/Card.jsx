import "./Card.css";
import { Icon } from "components";
import { getCover } from "helpers";

const Card = (props) => {
  const { id, image = null, title, titleDescription, price, categoryId, categoryTitle, count } = props;

  const onPressCard = () => props?.onPressCard(categoryId, id);

  const onPressPlus = () => props?.onPressPlus(categoryId, id);

  const onPressMinus = () => props?.onPressMinus(categoryId, id);

  return (
    <div id={id} className="card noselect">
      <div className="card-info" onClick={onPressCard}>
        <div className="card-image-wrap">
          <img src={getCover(categoryTitle, image)} className="card-image" />

          {count > 0 ? (
            <div className="card-counter-wrap">
              <div className="card-counter-inner">
                <span className="card-counter">{count}</span>
              </div>
            </div>
          ) : null}
        </div>

        <span className="card-title">{title}</span>
        <span className="card-subtitle">{titleDescription}</span>
      </div>

      <div className="card-buttons">
        {count ? (
          <button className="card-btn-minus" onClick={onPressMinus}>
            <Icon name="minus" color="white" />
          </button>
        ) : null}

        <button className="card-btn-plus" onClick={onPressPlus}>
          <span className="card-price">{price || "0"} ₽</span>
          <Icon name="plus" color="white" />
        </button>
      </div>
    </div>
  );
};

export default Card;
