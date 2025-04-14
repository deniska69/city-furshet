type TypePriceModel = {
	category?: string;
	category_description?: string;
	image?: string;
	title?: string;
	title_description?: string;
	price?: string;
	description?: string;
	description_second?: string;
};

type TypePriceCategory = {
	category_id: string;
	category_hide: boolean;
	category_title: string;
	category_description: string;
};

type TypePriceProduct = {
	product_id: string;
	product_hide: boolean;
	product_title: string;
	product_description: string;
	product_note: string;
	product_note_additional: string;
	product_price: string;
	product_cover: string;
	product_gallery: string;
};
