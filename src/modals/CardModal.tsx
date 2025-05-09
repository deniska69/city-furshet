import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getCover, getGallery, getImageError } from '@helpers';
import { basketStore, priceStore } from '@stores';
import { Icon, Loader, Modal } from '@ui';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css/pagination';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 'swiper/css/navigation';

interface IComponent {
	categoryId: string;
	productId: string;
}

const Component = ({ productId, categoryId }: IComponent) => {
	const navigate = useNavigate();

	if (!priceStore.getProducts(categoryId)) return <Loader />;

	const item = priceStore.getProduct(categoryId, productId);

	if (!item) {
		return (
			<Modal className="min-content">
				<div className="card-view-empty">
					<Icon color="gray" />
					<span>Ошибка параметров товара.</span>
				</div>
			</Modal>
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
		product_gallery,
	} = item;

	const handlePressAdd = () => basketStore.add(categoryId, productId);

	const handlePressRemove = () => basketStore.remove(categoryId, productId);

	const count = () => basketStore.getCountProduct(categoryId, productId);

	const handlePressBasket = () => navigate('/basket');

	const cover = getCover(categoryId, product_id, product_cover);

	const gallery = getGallery(categoryId, productId, product_gallery);

	return (
		<Modal title={product_title} size="lg" className="min-content">
			<div className="card-view hidescroll">
				{gallery ? (
					<div className="card-gallery-wrap">
						<Swiper pagination={true} navigation={true} modules={[Navigation, Pagination]}>
							{cover ? (
								<SwiperSlide>
									<img src={cover} onError={getImageError} className="card-view-image" />
								</SwiperSlide>
							) : null}

							{gallery.map((el, index) => (
								<SwiperSlide key={index}>
									<img src={el} onError={getImageError} className="card-view-image" />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<img src={cover} onError={getImageError} className="card-view-image" />
				)}

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
		</Modal>
	);
};

export const CardModal = observer(Component);
