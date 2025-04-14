import { SyntheticEvent } from 'react';
import imagePlaceholder from 'assets/image_placeholder.jpg';

const getCover = (categoryTitle?: string, image?: string) => {
	if (categoryTitle && image) {
		return `images/${categoryTitle}/${image}`;
	}

	return imagePlaceholder;
};

const getImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
	return (e.currentTarget.src = imagePlaceholder);
};

export { getCover, getImageError };
