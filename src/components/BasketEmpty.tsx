export const BasketEmpty = ({ onClose }: { onClose: () => void }) => (
	<div className="flex flex-col justify-center items-center h-full text-2xl text-muted text-center gap-y-4 p-8 min-h-[50vh]">
		<span>Вы ещё ничего не выбрали.</span>
		<a onClick={onClose} className="hover:cursor-pointer decoration-primary underline">
			Посмотрите, сколько всего вкусного у нас в меню 👈
		</a>
	</div>
);
