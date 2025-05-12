import { Loader } from '@ui';

export const BasketSuccess = () => (
	<div className="flex flex-col gap-y-18 justify-center items-center h-full p-8 text-center text-2xl min-h-[50vh]">
		<Loader />
		<span className="text-base">
			Отлично!
			<br />
			Мы уже получили ваш заказ и скоро с Вами свяжемся!
		</span>
	</div>
);
