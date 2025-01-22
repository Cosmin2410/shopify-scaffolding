import { writable } from 'svelte/store';

import type { Cart } from '@/types/cart';

function createCart(cart: Cart | null) {
	const { subscribe, set, update } = writable<Cart | null>(cart);

	function setCart(cart: Cart) {
		set(cart);
	}

	function updateCart(updater: (cart: Cart | null) => Cart | null) {
		update(updater);
	}

	function resetCart() {
		set(null);
	}

	return { subscribe, setCart, resetCart, updateCart };
}

export const cart = createCart(null);
