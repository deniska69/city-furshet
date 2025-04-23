import { Loader } from './Loader';

export const BasketSuccess = () => (
	<div className="basket-success">
		<Loader />
		<span>
			Отлично!
			<br />
			Мы уже получили ваш заказ и скоро с Вами свяжемся!
		</span>
	</div>
);
