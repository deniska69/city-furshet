import "./CardBasket.css";
import { Icon } from "components";
import { getCover, getImageError } from "helpers";

const CardBasket = (props) => {
  const {
    id,
    image = null,
    title,
    titleDescription,
    price = 0,
    categoryId,
    categoryTitle,
    count = 0,
    onPressCard,
    onPressPlus,
    onPressMinus,
    onPressDelete,
  } = props;

  const handlePressCard = () => onPressCard(categoryId, id);

  const handlePressPlus = (e) => {
    e.stopPropagation();
    onPressPlus(categoryId, id);
  };

  const handlePressMinus = (e) => {
    e.stopPropagation();
    onPressMinus(categoryId, id);
  };

  const handlePressDelete = (e) => {
    e.stopPropagation();
    onPressDelete(categoryId, id);
  };

  return (
    <div className="card-basket" onClick={handlePressCard}>
      <img src={getCover(categoryTitle, image)} className="card-basket-image" onError={getImageError} />

      <div className="card-basket-inner">
        <div className="card-basket-inner-header">
          <div className="card-basket-text">
            <span className="card-title">{title}</span>
            <span className="card-subtitle">{titleDescription}</span>
          </div>

          <button className="card-basket-delete-button" onClick={handlePressDelete}>
            <Icon name="close" color="gray" size={16} />
          </button>
        </div>

        <div className="card-basket-inner-footer">
          <div className="card-basket-buttons">
            <button className="card-btn-minus" onClick={handlePressMinus}>
              <Icon name="minus" color="white" />
            </button>

            <span className="card-basket-counter">{count}</span>

            <button className="card-btn-plus" onClick={handlePressPlus}>
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
