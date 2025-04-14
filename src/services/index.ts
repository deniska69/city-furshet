import $ from 'jquery';

import { CYRYLLIC_SYMBOLS } from '@constants';

export const sendOrder = async (dataSend: string) => {
	await $.ajax({
		type: 'POST',
		url: import.meta.env.VITE_SEND_URL,
		data: dataSend,
		success: (data) => Promise.resolve(data),
		error: (e) => Promise.reject(e),
	});
};

export const getPrice = async () => {
	const url = import.meta.env.DEV
		? import.meta.env.VITE_PRICE_URL_DEV
		: import.meta.env.VITE_PRICE_URL;

	console.log({ url });

	const xhrArrayBuffer = new XMLHttpRequest();
	xhrArrayBuffer.responseType = 'arraybuffer';

	let res = {};

	await $.ajax({
		url: `${url}?_=${new Date().getUTCSeconds()}`,
		method: 'GET',
		xhr: () => xhrArrayBuffer,
		success: (data) => (res = processingCSV(decodeCSV(data))),
		cache: false,
	});

	return Promise.resolve(res);
};

const decodeCSV = (responseArrayBuffer: ArrayBufferLike) => {
	const dataView = new DataView(responseArrayBuffer);
	const decoder = new TextDecoder('windows-1251');
	return decoder.decode(dataView);
};

const processingCSV = (string: string) => {
	let arr = string.split('\n');
	let data = {};
	// let temp = [];

	console.log(arr);

	// let model: TypePriceModel = {
	// 	category: undefined,
	// 	category_description: undefined,
	// 	image: undefined,
	// 	title: undefined,
	// 	title_description: undefined,
	// 	price: undefined,
	// 	description: undefined,
	// 	description_second: undefined,
	// };

	// arr[0].split(';').forEach((item, index) => {
	// 	return (model[item.trim()] = index);
	// });

	// console.log('');
	// console.log('CSV Model:');
	// console.log(model);

	// arr.forEach((el, index) => {
	// 	if (index > 0) {
	// 		const row = el.split(';');

	// 		const categoryTitle = processingString(row[model['category']]);
	// 		const categoryDescription = processingString(row[model['category_description']]);
	// 		const categoryId = transliterate(categoryTitle);

	// 		const title = processingString(row[model['title']]);
	// 		const titleDescription = processingString(row[model['title_description']]);

	// 		const price = processingString(row[model['price']]);

	// 		const id = `${categoryId}_${transliterate(title)}_${price}`;

	// 		const description = processingString(row[model['description']]);
	// 		const descriptionSecond = processingString(row[model['description_second']]);

	// 		const image = processingString(row[model['image']]);

	// 		const item = {
	// 			categoryId,
	// 			categoryTitle,
	// 			categoryDescription,
	// 			id,
	// 			image,
	// 			title,
	// 			titleDescription,
	// 			price,
	// 			description,
	// 			descriptionSecond,
	// 		};

	// 		if (item?.title && item?.categoryTitle) temp.push(item);
	// 	}
	// });

	// temp.forEach((item) => {
	// 	const categoryId = item?.categoryId;

	// 	if (!data.hasOwnProperty(categoryId)) {
	// 		data[categoryId] = {
	// 			id: categoryId,
	// 			title: item?.categoryTitle,
	// 			description: item?.categoryDescription,
	// 			items: temp.filter((el) => el?.categoryId === categoryId),
	// 		};
	// 	}
	// });

	console.log('');
	console.log('Processed data.:');
	console.log(data);

	return data;
};

const processingString = (s: string) => {
	return s ? s.trim().replaceAll('  ', ' ').replaceAll('\n', '').replaceAll('\r', '') : s;
};

const transliterate = (string: string) => {
	if (!string) return string;

	return string
		.split('')
		.map((char) =>
			CYRYLLIC_SYMBOLS.hasOwnProperty(char)
				? CYRYLLIC_SYMBOLS[char as keyof typeof CYRYLLIC_SYMBOLS]
				: '',
		)
		.join('')
		.replaceAll(' ', '');
};
