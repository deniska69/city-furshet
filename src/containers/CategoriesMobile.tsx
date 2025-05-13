import { observer } from 'mobx-react';

import { cn } from '@helpers';
import { basketStore, priceStore } from '@stores';

interface ICategoriesMobile {
	selectedId: string;
	onPressCategory: (categoryId: string) => void;
}

export const Component = ({ selectedId, onPressCategory }: ICategoriesMobile) => {
	const categories = priceStore.getCategories();

	if (!categories) return null;

	return (
		<div className="px-2 w-full max-w-[100vw] xl:hidden">
			<div className="flex flex-row flex-nowrap w-full overflow-auto gap-x-2.5 hidescroll">
				{categories.map((item) => {
					const active = item.category_id === selectedId ? ' active' : '';
					const count = basketStore.getCountCategory(item.category_id);

					return (
						<button
							key={item.category_id}
							id={item.category_id}
							className={cn(
								'rounded-4xl font-medium hover:cursor-pointer transition-all flex flex-row gap-x-2 items-center flex-nowrap h-10 py-0 px-4 text-nowrap',
								active
									? 'bg-primary active:bg-primary/80 hover:bg-primary/80 text-white'
									: 'bg-white active:bg-white/80 hover:bg-white/80 text-base',
							)}
							onClick={() => onPressCategory(item.category_id)}
						>
							{item.category_title}

							{count ? (
								<div className="rounded-full bg-secondary w-6 h-6 flex items-center justify-center">
									<span className="text-white font-semibold leading-4">{count}</span>
								</div>
							) : null}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export const CategoriesMobile = observer(Component);
