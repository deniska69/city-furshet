import { observer } from 'mobx-react';

import { cn, getCover, getImageError } from '@helpers';
import { useWindowDimensions } from '@hooks';
import { basketStore, priceStore } from '@stores';
import { Icon } from '@ui';

interface ICard {
	productId: string;
	categoryId: string;
	onOpenCard: (categoryId: string, productId: string) => void;
}

export const Component = ({ productId, categoryId, onOpenCard }: ICard) => {
	const { isXS } = useWindowDimensions();

	const count = basketStore.getCountProduct(categoryId, productId);
	const product = priceStore.getProduct(categoryId, productId);

	if (!product) return null;

	const handlePressCard = () => onOpenCard(categoryId, productId);

	const handlePressAdd = () => basketStore.add(categoryId, productId);

	const handlePressRemove = () => basketStore.remove(categoryId, productId);

	return (
		<div
			id={productId}
			className="noselect rounded-xl p-2 xs:p-4 bg-card-background relative cursor-pointer flex flex-col justify-between max-w-[48%] lg:max-w-[200px] gap-y-3 shadow-xl/10"
		>
			<div className="flex flex-col gap-y-2 h-full" onClick={handlePressCard}>
				<div className="relative min-w-[100px] lg:min-w-[150px] min-h-[100px] max-h-[200px] aspect-square overflow-hidden rounded-lg">
					<img
						src={getCover(categoryId, productId, product.product_cover)}
						className="w-full min-w-[100px] lg:min-w-[150px] max-w-[200px] object-cover aspect-square"
						onError={getImageError}
					/>

					<div
						className={cn(
							'absolute top-0 left-0 right-0 bottom-0 transition-all duration-300',
							count ? 'opacity-100' : 'opacity-0',
						)}
					>
						<div className="w-full h-full bg-black/50 flex items-center justify-center">
							<span className="text-7xl text-white">{count || 1}</span>
						</div>
					</div>
				</div>

				<span className="text-base font-semibold leading-4">{product.product_title}</span>
				<span className="text-muted leading-4">{product.product_note}</span>
			</div>

			<div className="flex flex-row gap-x-1 gap-y-2 items-center justify-start">
				<button
					className={cn(
						'flex h-8 bg-muted p-2 cursor-pointer items-center justify-center transition-all hover:bg-muted/80 active:bg-muted/80 active:scale-98 rounded-l-4xl rounded-r-xl duration-300 origin-left',
						count ? 'opacity-100' : 'opacity-35 scale-x-0',
					)}
					onClick={handlePressRemove}
				>
					<Icon name="minus" color="white" size={isXS ? 16 : 20} />
				</button>

				<button
					className={cn(
						'flex h-8 bg-primary p-2 cursor-pointer items-center justify-center transition-all hover:bg-primary/80 active:bg-primary/80 active:scale-98 gap-x-1 duration-300',
						count ? 'rounded-l-xl rounded-r-4xl' : 'rounded-4xl -translate-x-9',
					)}
					onClick={handlePressAdd}
				>
					<span className={cn('text-white font-medium', isXS ? 'text-xs' : 'text-md')}>
						{product.product_price || '0'} ₽
					</span>
					<Icon name="plus" color="white" size={isXS ? 16 : 20} />
				</button>
			</div>
		</div>
	);
};

export const Card = observer(Component);
