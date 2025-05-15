import { MouseEvent } from 'react';
import { observer } from 'mobx-react';

import { getCover, getImageError } from '@helpers';
import { basketStore, priceStore } from '@stores';
import { Icon } from '@ui';

interface ICardBasket extends TypeBasketGetItem {
	onOpenCard: (categoryId: string, productId: string) => void;
}

const Component = ({ categoryId, productId, count, onOpenCard }: ICardBasket) => {
	const product = priceStore.getProduct(categoryId, productId);

	if (!product) return null;

	const handlePressCard = () => onOpenCard(categoryId, productId);

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
		<div
			className="flex flex-row gap-x-2 py-4 px-2 group border-b border-b-border last-of-type:border-none hover:cursor-pointer"
			onClick={handlePressCard}
		>
			<img
				onError={getImageError}
				className="w-full max-w-22 max-h-22 object-cover rounded-lg"
				src={getCover(categoryId, productId, product.product_cover)}
			/>

			<div className="flex flex-col justify-between gap-y-2 w-full">
				<div className="flex flex-row justify-between items-start">
					<div className="flex flex-col">
						<span className="group-hover:underline text-base text-md font-semibold">
							{product.product_title}
						</span>
						<span className="text-muted">{product.product_note}</span>
					</div>

					<button
						className="bg-white p-2 rounded-full flex justify-center items-center hover:cursor-pointer transition-all hover:scale-90 active:scale-90"
						onClick={handlePressDelete}
					>
						<Icon name="close" color="gray" size={16} />
					</button>
				</div>

				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-row items-center gap-x-2">
						<button
							className="bg-muted transition-all active:scale-90 px-3 py-1.5 rounded-full hover:cursor-pointer"
							onClick={handlePressRemove}
						>
							<Icon name="minus" color="white" />
						</button>

						<span className="text-xl text-base">{count}</span>

						<button
							className="bg-primary transition-all active:scale-90 px-3 py-1.5 rounded-full hover:cursor-pointer"
							onClick={handlePressAdd}
						>
							<Icon name="plus" color="white" />
						</button>
					</div>

					<span className="text-lg text-muted">{`${count * parseInt(product.product_price)} ₽`}</span>
				</div>
			</div>
		</div>
	);
};
export const CardBasket = observer(Component);
