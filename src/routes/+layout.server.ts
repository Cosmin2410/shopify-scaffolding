import { getCart } from '@/server/services/cartService/getCart';
import { getCookie } from '@/server/utils/cookieManager';
import { SESSION_COOKIE, GUEST_CART_ID, CUSTOMER_CART_ID } from '@/constants/cookie';

import type { Customer } from '@/graphql/generated/storefront.types';
import type { Cart } from '@/types/cart';

export const load = async ({ locals, cookies }) => {
	const session = getCookie(cookies, SESSION_COOKIE);
	const guestCartId = getCookie(cookies, GUEST_CART_ID);
	const customerCartId = getCookie(cookies, CUSTOMER_CART_ID);

	const cartId = session ? customerCartId : guestCartId;

	const user = locals.user as Customer | null;
	let cart: Cart | null = null;

	if (cartId) {
		const [resp, error] = await getCart({ id: cartId });

		if (resp?.cart && !error) {
			cart = resp.cart;
		}
	}

	return {
		user,
		cart
	};
};
