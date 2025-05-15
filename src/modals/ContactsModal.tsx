import vkontakte from '@assets/vkontakte.png';
import { Documents } from '@components';
import { Modal } from '@ui';

export const ContactsModal = () => (
	<Modal title="Контакты" className="h-min">
		<div className="flex flex-col gap-y-4 p-4 overflow-y-auto max-h-[calc(100svh-var(--modal-header-height)-var(--modal-header-height-mt))]">
			<span className="text-base text-xl font-semibold">City Furshet</span>
			<span className="text-base text-xl font-semibold">Новокузнецк, проезд Курбатова, 1</span>

			<div className="flex flex-col gap-y-2">
				<div className="flex flex-row items-center gap-x-2 flex-wrap">
					<span className="text-base text-xl font-semibold">Телефон:</span>
					<a
						className="text-secondary text-xl font-medium hover:underline action:underline cursor-pointer"
						href="tel: 89951641179"
					>
						8 (995) 164-11-79
					</a>
				</div>

				<div className="flex flex-row items-center gap-x-2 flex-wrap">
					<span className="text-base text-xl font-semibold">Телефон:</span>
					<a
						className="text-secondary text-xl font-medium hover:underline action:underline cursor-pointer"
						href="tel: 89236311608"
					>
						8 (923) 631-16-08
					</a>
				</div>
			</div>

			<div className="flex flex-col gap-y-2">
				<div className="flex flex-row items-center gap-x-2 flex-wrap">
					<span className="text-base text-xl font-semibold">
						Время доставки и выдачи заказов:
					</span>
					<span className="text-base text-xl">По договорённости</span>
				</div>
			</div>

			<div className="flex flex-col gap-y-2">
				<div className="flex flex-row items-center gap-x-1 flex-wrap">
					<img src={vkontakte} alt="Вконтакте" />
					<span className="text-base text-xl font-semibold mr-1">Вконтакте:</span>
					<a
						className="text-secondary text-xl font-medium hover:underline action:underline cursor-pointer"
						href="https://vk.com/cityfurshet"
						target="_blank"
					>
						vk.com/cityfurshet
					</a>
				</div>
			</div>

			<Documents />
		</div>
	</Modal>
);
