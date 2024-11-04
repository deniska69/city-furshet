import "./CardOrder.css";
import imagePlaceholder from "assets/image_placeholder.jpg";

const getCover = (image) => {
  return import.meta.env.DEV || image === "city-furshet.ru/images/image_placeholder.jpg" ? imagePlaceholder : image;
};

const CardOrder = (props) => {
  const { id, categoryId, image = null, title, subtitle, price = 0, count = 0 } = props;

  const onPress = () => props?.onPress(categoryId, id);

  return (
    <div className="card-order" onClick={onPress}>
      <img src={getCover(image)} className="card-order-image" />

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
