import { SyntheticEvent } from 'react';
import imagePlaceholder from 'assets/image_placeholder.jpg';

const getCover = (categoryId?: string, productId?: string, imageId?: string) => {
	if (categoryId && productId && imageId) {
		return `images/${categoryId}/${productId}/${imageId}.jpg`;
	}

	return imagePlaceholder;
};

const getImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
	return (e.currentTarget.src = imagePlaceholder);
};

export { getCover, getImageError };
