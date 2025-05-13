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
		<div
			className="flex flex-row gap-x-2 active:scale-98 transition-all group hover:cursor-pointer"
			onClick={handlePressCard}
		>
			<img
				onError={getImageError}
				className="w-full max-w-12 max-h-12 object-cover rounded-lg"
				src={getCover(categoryId, productId, product.product_cover)}
			/>

			<div className="w-full flex flex-col gap-x-2">
				<div className="flex flex-col items-start justify-start">
					<span className="text-base font-semibold group-hover:underline">
						{product.product_title}
					</span>
				</div>

				<div>
					<span className="text-muted">{`${count} шт. • ${product.product_price} ₽`}</span>
				</div>
			</div>
		</div>
	);
};

export const CardOrder = observer(Component);
