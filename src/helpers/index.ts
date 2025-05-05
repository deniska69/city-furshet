import { SyntheticEvent } from 'react';
import { To } from 'react-router';

import imagePlaceholder from '@assets/image_placeholder.jpg';

export const getCover = (categoryId?: string, productId?: string, imageId?: string) => {
	if (categoryId && productId && imageId) {
		const s = import.meta.env.DEV ? 'https://city-furshet.ru/images' : 'images';
		return `${s}/${categoryId}/${productId}/${imageId}.jpg`;
	}

	return imagePlaceholder;
};

export const getImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
	return (e.currentTarget.src = imagePlaceholder);
};

export const getGallery = (categoryId?: string, productId?: string, gallery?: string) => {
	const arr = gallery?.replaceAll(' ', '').split(',');
	if (!arr) return undefined;
	return arr.map((imageId) => getCover(categoryId, productId, imageId));
};

export const scrollToMenu = (delay?: number) => {
	setTimeout(() => {
		const menu = document.getElementById('menu');

		if (menu) menu.scrollIntoView({ behavior: 'smooth' });
	}, delay);
};

export const goBack = (): To => {
	const h = window.history;
	if (!!h?.length && h.length > 1 && h.state.idx > 0) return -1 as To;
	return '/';
};
