import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn, getCover, getGallery, getImageError } from '@helpers';
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
			<Modal className="h-min">
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
		<Modal title={product_title} size="lg" className="lg:!max-h-[490px]">
			<div className="flex flex-col lg:flex-row p-4 gap-y-6 h-full max-h-[calc(100svh-var(--modal-header-height)-var(--modal-header-height-mt))] lg:max-h-[calc(90svh-var(--modal-header-height))] overflow-scroll hidescroll gap-4">
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
						<div className="flex w-full flex-row gap-x-2 items-center">
							<button
								className="flex h-8 bg-muted px-3 py-1.5 cursor-pointer items-center justify-center transition-all hover:bg-muted/80 active:bg-muted/80 active:scale-98 rounded-full"
								onClick={handlePressRemove}
							>
								<Icon name="minus" color="white" />
							</button>

							<div className="flex items-center justify-center min-w-5">
								<span className="text-xl text-base">{count() || '0'}</span>
							</div>

							<button
								className="flex h-8 bg-primary px-3 py-1.5 cursor-pointer items-center justify-center transition-all hover:bg-primary/80 active:bg-primary/80 active:scale-98 rounded-full gap-x-1"
								onClick={handlePressAdd}
							>
								<span className="text-white text-center font-medium text-md">
									{product_price || '0'} ₽
								</span>
								<Icon name="plus" color="white" />
							</button>
						</div>

						<button
							className={cn(
								'flex h-8 bg-primary px-3 py-1.5 cursor-pointer items-center justify-center hover:bg-primary/80 active:bg-primary/80 active:scale-98 rounded-full gap-x-1 transition-all duration-300',
								count() ? 'opacity-100' : 'opacity-0',
							)}
							onClick={handlePressBasket}
						>
							<Icon name="basket" color="white" />
						</button>
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
