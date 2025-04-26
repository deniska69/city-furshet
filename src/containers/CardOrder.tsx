import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { getCover, getImageError } from '@helpers';
import { priceStore } from '@stores';

interface ICardOrder {
	categoryId: string;
	productId: string;
	count: number;
}

const Component = ({ categoryId, productId, count }: ICardOrder) => {
	const navigate = useNavigate();

	const product = priceStore.getProduct(categoryId, productId);

	if (!product) return null;

	const handlePressCard = () => {
		navigate(`?category_id=${categoryId}&card_id=${productId}`);
	};

	return (
		<div className="card-order" onClick={handlePressCard}>
			<img
				onError={getImageError}
				className="card-order-image"
				src={getCover(categoryId, productId, product.product_cover)}
			/>

			<div className="card-order-inner">
				<div className="card-order-inner-header">
					<span className="card-title">{product.product_title}</span>
					<span className="card-subtitle">{product.product_note}</span>
				</div>

				<div className="card-order-inner-footer">
					<span className="card-subtitle">{`${count} шт. • ${product.product_price} ₽`}</span>
				</div>
			</div>
		</div>
	);
};

export const CardOrder = observer(Component);
