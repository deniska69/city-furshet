import { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@components';
import { getCover, getImageError } from '@helpers';
import { basketStore, priceStore } from '@stores';

const Component = ({ categoryId, productId, count }: TypeBasketGetItem) => {
	const navigate = useNavigate();

	const product = priceStore.getProduct(categoryId, productId);

	if (!product) return null;

	const handlePressCard = () => {
		navigate(`?category_id=${categoryId}&card_id=${productId}`);
	};

	const handlePressAdd = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		basketStore.add(categoryId, productId);
	};

	const handlePressRemove = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		basketStore.remove(categoryId, productId);
	};

	const handlePressDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		basketStore.delete(categoryId, productId);
	};

	return (
		<div className="card-basket" onClick={handlePressCard}>
			<img
				onError={getImageError}
				className="card-basket-image"
				src={getCover(categoryId, productId, product.product_cover)}
			/>

			<div className="card-basket-inner">
				<div className="card-basket-inner-header">
					<div className="card-basket-text">
						<span className="card-title">{product.product_title}</span>
						<span className="card-subtitle">{product.product_note}</span>
					</div>

					<button className="card-basket-delete-button" onClick={handlePressDelete}>
						<Icon name="close" color="gray" size={16} />
					</button>
				</div>

				<div className="card-basket-inner-footer">
					<div className="card-basket-buttons">
						<button className="card-btn-minus" onClick={handlePressRemove}>
							<Icon name="minus" color="white" />
						</button>

						<span className="card-basket-counter">{count}</span>

						<button className="card-btn-plus" onClick={handlePressAdd}>
							<Icon name="plus" color="white" />
						</button>
					</div>

					<span className="card-basket-total-price">{`${count * parseInt(product.product_price)} ₽`}</span>
				</div>
			</div>
		</div>
	);
};
export const CardBasket = observer(Component);
