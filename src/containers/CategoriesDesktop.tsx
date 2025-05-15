import { observer } from 'mobx-react';

import { cn } from '@helpers';
import { basketStore, priceStore } from '@stores';

interface ICategoriesDesktop {
	selectedId: string;
	onPressCategory: (categoryId: string) => void;
}

export const Component = ({ selectedId, onPressCategory }: ICategoriesDesktop) => {
	const categories = priceStore.getCategories();

	if (!categories) return null;

	return (
		<div className="lg:min-h-[calc(100vh-var(--header-height))] lg:max-h-[calc(100vh-var(--header-height))] overflow-y-auto hidden min-w-(--categories-width-desktop) max-w-(--categories-width-desktop) lg:flex items-start justify-center pt-4 pb-8">
			<div className="flex bg-white flex-col gap-y-2 rounded-3xl min-w-60 max-w-60 p-2">
				{categories.map((item) => {
					const active = item.category_id === selectedId ? ' active' : '';
					const count = basketStore.getCountCategory(item.category_id);

					return (
						<button
							key={item.category_id}
							id={item.category_id}
							className={cn(
								'rounded-full h-10 flex flex-row items-center justify-between cursor-pointer hover:bg-primary/10 px-5 transition-all duration-150',
								active
									? 'bg-primary hover:bg-primary/80 text-white'
									: 'bg-white hover:!bg-muted/20 active:!bg-primary active:!text-white text-base',
							)}
							onClick={() => onPressCategory(item.category_id)}
						>
							{item.category_title}

							<div
								className={cn(
									'min-w-6 h-6 bg-secondary flex items-center justify-center transition-all rounded-full duration-300',
									count ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
									count > 9 ? 'px-4' : 'px-2',
								)}
							>
								<span className="text-white font-semibold leading-4">{count || 1}</span>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export const CategoriesDesktop = observer(Component);
