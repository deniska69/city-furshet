import { Modal } from '@ui';

export const DeliveryPaymentModal = () => (
	<Modal title="Доставка и оплата" className="min-content">
		<div id="delivery-text-wrap">
			<span>Минимальная сумма заказа 3000₽</span>
			<span>Приём заказа минимум за 2 дня до Мероприятия</span>
			<span>
				Дата бронирования после внесения предоплаты 50% от заказа , остаток в день доставки
			</span>
			<span>
				Работаем с юр.лицами, предоставляем все необходимые документы для оплаты по реквизитам
			</span>
			<span>При отказе от заказа за день или в день заказа предоплата не возвращается</span>
			<span>Самовывоз г.Новокузнецк проезд Курбатова 1</span>
			<span>Доставка оплачивается отдельно по тарифу Яндекс.Доставки</span>
			<span>
				При заказе на сумму от 10.000₽ доставка бесплатная в неотдаленные районы ( список
				районов уточняйте)
			</span>
		</div>
	</Modal>
);
