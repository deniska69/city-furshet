import { useState } from 'react';

export const useOpen = (state?: boolean) => {
	const [isOpen, setIsOpen] = useState(!!state);

	const onOpen = () => setIsOpen(true);

	const onClose = () => setIsOpen(false);

	return { isOpen, onOpen, onClose };
};
