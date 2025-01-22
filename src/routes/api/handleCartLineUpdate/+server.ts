import { cartLineRemove, cartLineUpdate } from '@/server/services/cartService';
import { SESSION_COOKIE, CUSTOMER_CART_ID, GUEST_CART_ID } from '@/constants/cookie';
import { getCookie } from '@/server/utils/cookieManager';

import type { BaseCartLine } from '@/graphql/generated/storefront.types.js';
import type { Cart, CartResponse } from '@/types/cart';

type Action = 'retract' | 'add' | 'remove-all';

interface RequestType {
	quantity: number;
	merchandiseId: string;
	line: BaseCartLine;
	action: Action;
}

function calculateNewQuantity(action: Action, quantity: number, currentQuantity: number): number {
	switch (action) {
		case 'add':
			return currentQuantity + quantity;
		case 'retract':
			return Math.max(currentQuantity - quantity, 0);

		default:
			return 0;
	}
}

async function handleCartLineRemove(cartId: string, lineIds: string[]) {
	const [data, error] = await cartLineRemove({
		cartId,
		lineIds
	});

	if (error || !data?.cartLinesRemove?.cart?.id) {
		throw new Error(error?.message || 'Failed to remove cart line!');
	}

	return data?.cartLinesRemove?.cart;
}

async function handleCartLineUpdate(
	cartId: string,
	merchandiseId: string,
	line: BaseCartLine,
	quantity: number,
	action: Action
) {
	const newQuantity = calculateNewQuantity(action, quantity, line.quantity);

	const [data, error] = await cartLineUpdate({
		cartId,
		lines: [{ id: line.id, merchandiseId, quantity: newQuantity }]
	});

	if (error || !data?.cartLinesUpdate?.cart?.id) {
		throw new Error(error?.message || 'Failed to update cart line!');
	}

	return data?.cartLinesUpdate?.cart;
}

export const POST = async ({ cookies, request }): Promise<Response> => {
	try {
		const { merchandiseId, quantity, line, action }: RequestType = await request.json();

		if (!merchandiseId || quantity <= 0 || !line?.id || !action) {
			return new Response(JSON.stringify({ error: 'Missing or invalid parameters!' }), {
				status: 400
			});
		}

		const session = getCookie(cookies, SESSION_COOKIE);
		const guestCartId = getCookie(cookies, GUEST_CART_ID);
		const customerCartId = getCookie(cookies, CUSTOMER_CART_ID);
		const cartId = session ? customerCartId : guestCartId;

		if (!cartId) {
			return new Response(
				JSON.stringify({ error: 'No cart IDs found!', cart: null } satisfies CartResponse),
				{ status: 400 }
			);
		}

		let cart: Cart;

		switch (action) {
			case 'add':
			case 'retract':
				cart = await handleCartLineUpdate(cartId, merchandiseId, line, quantity, action);
				break;

			case 'remove-all':
				cart = await handleCartLineRemove(cartId, [line.id]);
				break;

			default:
				return new Response(JSON.stringify({ error: 'Invalid action!' }), { status: 400 });
		}

		return new Response(JSON.stringify({ error: null, cart } satisfies CartResponse), {
			status: 200
		});
	} catch (error) {
		console.error('Error:', error);
		const errorMessage = typeof error === 'string' ? error : 'Unable to process request!';

		return new Response(
			JSON.stringify({ error: errorMessage, cart: null } satisfies CartResponse),
			{
				status: 500
			}
		);
	}
};
