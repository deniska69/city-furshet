import { ReactNode, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '@styles/Dialog.css';

import { Icon } from './Icon';

interface IDialog {
	title?: string;
	onClose?: () => void;
	size?: 'md' | 'lg';
	className?: string;
	children?: ReactNode;
}

export const Dialog = (props: IDialog) => {
	const { title, onClose, size = 'md', className, children } = props;

	const refDialog = useRef<HTMLDialogElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (refDialog.current) refDialog.current.showModal();
		document.body.classList.add('dialog-open');

		return () => {
			if (refDialog.current) refDialog.current.close();
			document.body.classList.remove('dialog-open');
		};
	}, []);

	const handleClose = () => {
		if (onClose) return onClose();
		navigate('/');
	};

	return (
		<dialog ref={refDialog} className="dialog-root noselect" onClick={onClose}>
			<div
				className={`dialog-content dialog-size-${size} ${className ? className : ''}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="dialog-header">
					<span>{title}</span>

					<button className="dialog-header-close" onClick={handleClose}>
						<Icon name="close" color="#404040" />
					</button>
				</div>

				<div className="dialog-body">{children}</div>
			</div>
		</dialog>
	);
};
