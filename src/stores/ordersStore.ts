import { makeAutoObservable } from 'mobx';

class OrdersStore {
	add = (items: TypeBasket) => {
		console.log(items);
	};
}

export const ordersStore = makeAutoObservable(new OrdersStore());
