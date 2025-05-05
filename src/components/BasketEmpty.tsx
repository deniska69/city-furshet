export const BasketEmpty = ({ onClose }: { onClose: () => void }) => (
	<div className="basket-empty">
		<span>Вы ещё ничего не выбрали.</span>
		<a onClick={onClose}>Посмотрите, сколько всего вкусного у нас в меню 👈</a>
	</div>
);
