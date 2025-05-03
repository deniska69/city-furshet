import { useNavigate } from 'react-router-dom';

import { Dialog } from '@components';
import { useEscape } from '@hooks';

export const ContactsModal = () => {
	const navigate = useNavigate();

	const handleClose = () => navigate('/');

	useEscape(handleClose);

	return (
		<Dialog title="Контакты" onClose={handleClose} className="min-content">
			<div id="contacts-text-wrap">
				<span className="contacts-text-title">City Furshet</span>
				<span className="contacts-text-title">Новокузнецк, проезд Курбатова, 1</span>

				<div className="contacts-group">
					<div className="contacts-row">
						<span className="contacts-text-title">Телефон:</span>
						<span className="contacts-phone">
							<a href="tel: 89951641179">8 (995) 164-11-79</a>
						</span>
					</div>

					<div className="contacts-row">
						<span className="contacts-text-title">Телефон:</span>
						<span className="contacts-phone">
							<a href="tel: 89236311608">8 (923) 631-16-08</a>
						</span>
					</div>
				</div>

				<div className="contacts-group">
					<div className="contacts-row">
						<span className="contacts-text-title">Время доставки и выдачи заказов:</span>
						<span>По договорённости</span>
					</div>
				</div>
			</div>
		</Dialog>
	);
};
