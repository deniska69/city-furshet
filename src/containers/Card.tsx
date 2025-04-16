import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@components';
import { getCover, getImageError } from '@helpers';
import { basketStore, priceStore } from '@stores';

interface ICard {
	productId: string;
	categoryId: string;
}

export const Component = ({ productId, categoryId }: ICard) => {
	const navigate = useNavigate();

	const count = basketStore.getCountProduct(categoryId, productId);
	const product = priceStore.getProduct(categoryId, productId);

	if (!product) return null;

	const handlePressCard = () => {
		navigate(`?category_id=${categoryId}&card_id=${productId}`);
	};

	const handlePressAdd = () => basketStore.add(categoryId, productId);

	const handlePressRemove = () => basketStore.remove(categoryId, productId);

	return (
		<div id={productId} className="card noselect">
			<div className="card-info" onClick={handlePressCard}>
				<div className="card-image-wrap">
					<img
						src={getCover(categoryId, productId, product.product_cover)}
						className="card-image"
						onError={getImageError}
					/>

					{count ? (
						<div className="card-counter-wrap">
							<div className="card-counter-inner">
								<span className="card-counter">{count}</span>
							</div>
						</div>
					) : null}
				</div>

				<span className="card-title">{product.product_title}</span>
				<span className="card-subtitle">{product.product_note}</span>
			</div>

			<div className="card-buttons">
				{count ? (
					<button className="card-btn-minus" onClick={handlePressRemove}>
						<Icon name="minus" color="white" />
					</button>
				) : null}

				<button className="card-btn-plus" onClick={handlePressAdd}>
					<span className="card-price">{product.product_price || '0'} ₽</span>
					<Icon name="plus" color="white" />
				</button>
			</div>
		</div>
	);
};

export const Card = observer(Component);
