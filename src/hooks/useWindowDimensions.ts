import { useEffect, useState } from 'react';

const getWindowDimensions = () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const isMobile = width < 1280;

	return { width, height, isMobile };
};

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const handleResize = () => setWindowDimensions(getWindowDimensions());

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
};
