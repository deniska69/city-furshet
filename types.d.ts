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

type TypePriceRow = TypePriceCategory & TypePriceProduct;

type TypeBasketItem = Record<string, number>;

type TypeBasket = Map<string, TypeBasketItem>;

type TypeBasketGetItem = { categoryId: string; productId: string; count: number };

type TypeBasketGetItems = TypeBasketGetItem[] | undefined;

type TypeOrderItem = TypePriceCategory & TypePriceProduct & { count: number };

type TypeOrder = {
	date: string;
	items: TypeOrderItem[];
	total: number;
};
