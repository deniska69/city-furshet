import "./CardOrder.css";
import { getCover, getImageError } from "helpers";

const CardOrder = (props) => {
  const { id, categoryId, image = null, title, subtitle, price = 0, count = 0, categoryTitle } = props;

  const onPress = () => props?.onPress(categoryId, id);

  return (
    <div className="card-order" onClick={onPress}>
      <img src={getCover(categoryTitle, image)} className="card-order-image" onError={getImageError} />

      <div className="card-order-inner">
        <div className="card-order-inner-header">
          <span className="card-title">{title}</span>
          <span className="card-subtitle">{subtitle}</span>
        </div>

        <div className="card-order-inner-footer">
          <span className="card-subtitle">{`${count} шт. • ${price} ₽`}</span>
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
