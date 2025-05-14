import { ReactNode, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { cn, goBack } from '@helpers';
import { useEscape } from '@hooks';

import { Icon } from '../icon';

interface IModal {
	title?: string;
	onClose?: () => void;
	size?: 'md' | 'lg';
	className?: string;
	children?: ReactNode;
}

const sizes = {
	md: 'max-w-[600px]',
	lg: 'max-w-[900px]',
};

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
		<dialog
			ref={refDialog}
			className="noselect w-full h-full max-w-[100vw] max-h-[100svh] rounded-none p-0 m-0 bg-black/30 backdrop-blur-xs flex lg:items-center lg:justify-center"
			onClick={handleClose}
		>
			<div
				className={cn(
					'flex w-full flex-col bg-white h-full max-h-[calc(100svh-10px)] self-end rounded-t-3xl lg:self-center lg:max-h-[90svh] lg:mx-[3%] lg:rounded-lg shadow-xl/30',
					sizes[size],
					className,
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center flex-row justify-between p-4 pb-2 border-b border-b-border">
					<span className="text-base text-2xl font-semibold">{title}</span>

					<button
						className="bg-none text-base p-0 transition-all active:scale-90 active:outline-none cursor-pointer focus-visible:outline-none"
						onClick={handleClose}
					>
						<Icon name="close" color="#404040" />
					</button>
				</div>

				<div className="max-h-[calc(100svh-72px)] overflow-hidden h-full lg:max-h-[calc(90svh-57px)] min-h-[50svh]">
					{children}
				</div>
			</div>
		</dialog>
	);
};
