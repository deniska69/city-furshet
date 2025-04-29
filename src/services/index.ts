import $ from 'jquery';
import { inferSchema, initParser } from 'udsv';

type TypeSendOrder = {
	telegram: string;
	email: string;
};

export const sendOrder = async (dataSend: TypeSendOrder) => {
	return Promise.resolve();

	const isDev = import.meta.env.DEV;
	const urlProd = import.meta.env.VITE_SEND_URL;
	const urlDev = import.meta.env.VITE_SEND_URL_DEV;

	await $.ajax({
		type: 'POST',
		url: isDev ? urlDev : urlProd,
		data: dataSend,
		success: (data) => Promise.resolve(data),
		error: (e) => Promise.reject(e),
	});
};

export const getPrice = async () => {
	const url = import.meta.env.DEV
		? import.meta.env.VITE_PRICE_URL_DEV
		: import.meta.env.VITE_PRICE_URL;

	const xhrArrayBuffer = new XMLHttpRequest();
	xhrArrayBuffer.responseType = 'arraybuffer';

	let res = {};

	await $.ajax({
		url: `${url}?_=${new Date().getUTCSeconds()}`,
		method: 'GET',
		xhr: () => xhrArrayBuffer,
		success: (data) => (res = decodeCSV(data)),
		cache: false,
	});

	return Promise.resolve(res) as Promise<TypePriceRow[]>;
};

const decodeCSV = async (responseArrayBuffer: ArrayBufferLike) => {
	const dataView = new DataView(responseArrayBuffer);
	const decoder = new TextDecoder('windows-1251');
	const decodedCSV = decoder.decode(dataView);
	const parser = initParser(inferSchema(decodedCSV));
	const parsedPrice = parser.typedObjs(decodedCSV);
	return parsedPrice;
};
