export const OrdersEmpty = ({ onClose }: { onClose: () => void }) => (
	<div className="basket-empty">
		<span>Вы ещё ничего не заказали.</span>
		<a href="#menu" onClick={onClose}>
			Посмотрите, сколько всего вкусного у нас в меню 👈
		</a>
	</div>
);
