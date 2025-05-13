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
				<div className="flex flex-col items-center justify-center gap-y-3 min-h-[30vh]">
					<Icon color="gray" />
					<span className="text-2xl text-muted">Ошибка параметров товара</span>
					<span className="text-muted text-2xl">или товар снят с продажи</span>
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
			<div className="flex flex-col lg:flex-row p-4 gap-y-6 h-full max-h-[calc(100vh-110px)] lg:max-h-[calc(90vh-110px)] overflow-scroll hidescroll gap-4">
				{gallery ? (
					<div className="rounded-lg overflow-hidden min-w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] min-h-[calc(100vw-2rem)] max-h-[calc(100vw-2rem)] lg:min-w-[400px] lg:max-w-[400px] lg:min-h-[400px] lg:max-h-[400px]">
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

				<div className="flex flex-col w-full gap-y-6">
					<div className="flex flex-col w-full gap-y-3">
						<span className="text-base">{product_description}</span>
						{product_note ? <span className="text-muted">{product_note}</span> : null}
					</div>

					<div className="flex w-full flex-row gap-x-4">
						<div className="flex w-full flex-row gap-x-4 items-center">
							<button
								className="flex h-8 bg-muted px-4 py-2 cursor-pointer items-center justify-center transition-all hover:bg-muted/80 active:bg-muted/80 active:scale-98 rounded-full"
								onClick={handlePressRemove}
							>
								<Icon name="minus" color="white" />
							</button>

							<span className="text-xl text-base">{count() || '0'}</span>

							<button
								className="flex h-8 bg-primary px-3 py-2 cursor-pointer items-center justify-center transition-all hover:bg-primary/80 active:bg-primary/80 active:scale-98 rounded-full gap-x-1"
								onClick={handlePressAdd}
							>
								<span className="text-white font-medium text-lg">
									{product_price || '0'} ₽
								</span>
								<Icon name="plus" color="white" />
							</button>
						</div>

						{count() ? (
							<button
								className="flex h-8 bg-primary px-3 py-2 cursor-pointer items-center justify-center transition-all hover:bg-primary/80 active:bg-primary/80 active:scale-98 rounded-full gap-x-1"
								onClick={handlePressBasket}
							>
								<Icon name="basket" color="white" />
							</button>
						) : null}
					</div>

					{product_note_additional ? (
						<span className="text-muted">{product_note_additional}</span>
					) : null}
				</div>
			</div>
		</Modal>
	);
};

export const CardModal = observer(Component);
