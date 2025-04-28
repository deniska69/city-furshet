import { makeAutoObservable } from 'mobx';

class OrdersStore {
	add = (items: TypeBasket) => {};
}

export const ordersStore = makeAutoObservable(new OrdersStore());
