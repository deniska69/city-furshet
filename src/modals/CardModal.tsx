import { observer } from 'mobx-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Dialog, Icon, Loader } from '@components';
import { getCover, getImageError } from '@helpers';
import { useEscape } from '@hooks';
import { basketStore, priceStore } from '@stores';

interface IComponent {
	categoryId: string;
	productId: string;
}

const Component = ({ productId, categoryId }: IComponent) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClose = () => navigate(location.pathname);

	useEscape(handleClose);

	if (!priceStore.getProducts(categoryId)) return <Loader />;

	const item = priceStore.getProduct(categoryId, productId);

	if (!item) {
		return (
			<Dialog onClose={handleClose}>
				<div className="card-view-empty">
					<Icon color="gray" />
					<span>Ошибка параметров товара.</span>
				</div>
			</Dialog>
		);
	}

	const {
		product_id,
		product_title,
		product_cover,
		product_description,
		product_note,
		product_price,
		product_note_additional,
	} = item;

	const handlePressAdd = () => basketStore.add(categoryId, productId);

	const handlePressRemove = () => basketStore.remove(productId);

	const count = () => basketStore.getCountProduct(productId);

	const handlePressBasket = () => navigate('/basket');

	return (
		<Dialog title={product_title} onClose={handleClose} size="lg" className="min-content">
			<div className="card-view hidescroll">
				<img
					onError={getImageError}
					className="card-view-image"
					src={getCover(categoryId, product_id, product_cover)}
				/>

				<div className="card-view-footer">
					<div className="card-view-text">
						<span className="card-description">{product_description}</span>
						{product_note ? <span className="card-subtitle">{product_note}</span> : null}
					</div>

					<div className="card-view-buttons">
						<div className="card-view-buttons-first">
							<button className="card-btn-minus" onClick={handlePressRemove}>
								<Icon name="minus" color="white" />
							</button>

							<span className="card-basket-counter">{count() || '0'}</span>

							<button className="card-btn-plus" onClick={handlePressAdd}>
								<span className="card-price">{product_price || '0'} ₽</span>
								<Icon name="plus" color="white" />
							</button>
						</div>

						{count() ? (
							<button className="card-btn-basket" onClick={handlePressBasket}>
								<Icon name="basket" color="white" />
							</button>
						) : null}
					</div>

					{product_note_additional ? (
						<span className="card-subtitle">{product_note_additional}</span>
					) : null}
				</div>
			</div>
		</Dialog>
	);
};

export const CardModal = observer(Component);
