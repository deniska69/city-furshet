import { Modal } from '@ui';

export const DeliveryPaymentModal = () => (
	<Modal title="Доставка и оплата" className="h-min">
		<div className="flex flex-col gap-y-4 p-4 overflow-y-auto max-h-[calc(100svh-var(--modal-header-height)-var(--modal-header-height-mt))]">
			<span className="text-base text-lg">Минимальная сумма заказа 3000₽</span>
			<span className="text-base text-lg">Приём заказа минимум за 2 дня до Мероприятия</span>
			<span className="text-base text-lg">
				Дата бронирования после внесения предоплаты 50% от заказа , остаток в день доставки
			</span>
			<span className="text-base text-lg">
				Работаем с юр.лицами, предоставляем все необходимые документы для оплаты по реквизитам
			</span>
			<span className="text-base text-lg">
				При отказе от заказа за день или в день заказа предоплата не возвращается
			</span>
			<span className="text-base text-lg">Самовывоз г.Новокузнецк проезд Курбатова 1</span>
			<span className="text-base text-lg">
				Доставка оплачивается отдельно по тарифу Яндекс.Доставки
			</span>
			<span className="text-base text-lg">
				При заказе на сумму от 10.000₽ доставка бесплатная в неотдаленные районы ( список
				районов уточняйте)
			</span>
		</div>
	</Modal>
);
