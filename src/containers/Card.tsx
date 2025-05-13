import { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { getCover, getImageError } from '@helpers';
import { basketStore, priceStore } from '@stores';
import { Icon } from '@ui';

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
		<div
			id={productId}
			className="noselect rounded-xl p-4 bg-card-background relative cursor-pointer flex flex-col justify-between max-w-[48%] lg:max-w-[200px] gap-y-3"
		>
			<div className="flex flex-col gap-y-2 h-full" onClick={handlePressCard}>
				<div className="relative max-h-[200px] aspect-square overflow-hidden rounded-lg">
					<img
						src={getCover(categoryId, productId, product.product_cover)}
						className="w-full max-w-[200px] object-cover aspect-square"
						onError={getImageError}
					/>

					{count ? (
						<div className="absolute top-0 left-0 right-0 bottom-0">
							<div className="w-full h-full bg-black/50 flex items-center justify-center">
								<span className="text-7xl text-white">{count}</span>
							</div>
						</div>
					) : null}
				</div>

				<span className="text-base font-semibold leading-4">{product.product_title}</span>
				<span className="text-muted leading-4">{product.product_note}</span>
			</div>

			<div className="flex flex-row gap-x-2 gap-y-2 items-center justify-start flex-wrap-reverse">
				{count ? (
					<button
						className="flex h-8 bg-muted px-4 py-2 cursor-pointer items-center justify-center transition-all hover:bg-muted/80 active:bg-muted/80 active:scale-98 rounded-full"
						onClick={handlePressRemove}
					>
						<Icon name="minus" color="white" />
					</button>
				) : null}

				<button
					className="flex h-8 bg-primary px-3 py-2 cursor-pointer items-center justify-center transition-all hover:bg-primary/80 active:bg-primary/80 active:scale-98 rounded-full"
					onClick={handlePressAdd}
				>
					<span className="card-price">{product.product_price || '0'} ₽</span>
					<Icon name="plus" color="white" />
				</button>
			</div>
		</div>
	);
};

export const Card = observer(Component);
