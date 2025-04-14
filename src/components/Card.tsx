import { getCover, getImageError } from '@helpers';

import Icon from './Icon';

import '@styles/Card.css';

interface ICard extends TypePriceProduct {
	categoryId: string;
	count: string;
	onPressCard: (categoryId: string, id: string) => void;
	onPressAdd: (categoryId: string, id: string) => void;
	onPressRemove: (categoryId: string, id: string) => void;
}

export const Card = (props: ICard) => {
	const {
		categoryId,
		count,
		product_id,
		product_title,
		product_note,
		product_price,
		product_cover,
		onPressCard,
		onPressAdd,
		onPressRemove,
	} = props;

	const handlePressCard = () => onPressCard(categoryId, product_id);

	const handlePressAdd = () => onPressAdd(categoryId, product_id);

	const handlePressRemove = () => onPressRemove(categoryId, product_id);

	return (
		<div id={product_id} className="card noselect">
			<div className="card-info" onClick={handlePressCard}>
				<div className="card-image-wrap">
					<img
						src={getCover(categoryId, product_id, product_cover)}
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

				<span className="card-title">{product_title}</span>
				<span className="card-subtitle">{product_note}</span>
			</div>

			<div className="card-buttons">
				{count ? (
					<button className="card-btn-minus" onClick={handlePressAdd}>
						<Icon name="minus" color="white" />
					</button>
				) : null}

				<button className="card-btn-plus" onClick={handlePressRemove}>
					<span className="card-price">{product_price || '0'} ₽</span>
					<Icon name="plus" color="white" />
				</button>
			</div>
		</div>
	);
};
