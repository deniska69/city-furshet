import { SyntheticEvent } from 'react';
import imagePlaceholder from 'assets/image_placeholder.jpg';

const getCover = (categoryId?: string, productId?: string, imageId?: string) => {
	if (categoryId && productId && imageId) {
		const s = import.meta.env.DEV ? 'https://city-furshet.ru/images' : 'images';
		return `${s}/${categoryId}/${productId}/${imageId}.jpg`;
	}

	return imagePlaceholder;
};

const getImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
	return (e.currentTarget.src = imagePlaceholder);
};

export { getCover, getImageError };
