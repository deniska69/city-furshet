import { ReactNode, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { goBack } from '@helpers';
import { useEscape } from '@hooks';

import { Icon } from '../icon';

interface IModal {
	title?: string;
	onClose?: () => void;
	size?: 'md' | 'lg';
	className?: string;
	children?: ReactNode;
}

export const Modal = (props: IModal) => {
	const { title, onClose, size = 'md', className, children } = props;

	const refDialog = useRef<HTMLDialogElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (refDialog.current) refDialog.current.showModal();
		document.body.classList.add('modal-open');

		return () => {
			if (refDialog.current) refDialog.current.close();
			document.body.classList.remove('modal-open');
		};
	}, []);

	const handleClose = () => {
		if (onClose) return onClose();
		navigate(goBack());
	};

	useEscape(handleClose);

	return (
		<dialog ref={refDialog} className="modal-root noselect" onClick={handleClose}>
			<div
				className={`modal-content modal-size-${size} ${className ? className : ''}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="dialog-header">
					<span>{title}</span>

					<button className="modal-header-close" onClick={handleClose}>
						<Icon name="close" color="#404040" />
					</button>
				</div>

				<div className="modal-body">{children}</div>
			</div>
		</dialog>
	);
};
