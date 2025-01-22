import { cartMetafield } from '@/constants/metafield';
import { updateCustomerMetafields } from '@/server/services/adminService';
import { SESSION_COOKIE, CUSTOMER_CART_ID, GUEST_CART_ID } from '@/constants/cookie';
import { getCookie, setCookie } from '@/server/utils/cookieManager';
import {
	cartLineUpdate,
	createCart,
	cartLineAdd,
	getCartLine
} from '@/server/services/cartService';

import type { Cart, CartResponse } from '@/types/cart';

async function getCartLineData(carId: string, merchandiseId: string) {
	const [cartLine, error] = await getCartLine({ id: carId });
	if (error) {
		throw new Error(error?.message || 'Failed to fetch cart line!');
	}

	const lineId = cartLine?.cart?.lines?.edges?.find(
		(line) => line?.node?.merchandise?.id === merchandiseId
	);

	return lineId?.node;
}

async function updateOrAddCartLine(merchandiseId: string, quantity: number, cartId?: string) {
	if (!cartId) {
		throw new Error('No cart Id provided!');
	}

	const line = await getCartLineData(cartId, merchandiseId);

	// Update line cart
	if (line?.id) {
		const currentQuantity = line?.quantity || 0;
		const newQuantity = currentQuantity + quantity;

		const [data, error] = await cartLineUpdate({
			cartId,
			lines: { id: line?.id, quantity: newQuantity }
		});
		if (error || !data?.cartLinesUpdate?.cart?.id) {
			throw new Error(error?.message || 'Failed to update cart line!');
		}

		return data?.cartLinesUpdate?.cart;
	}

	// Add new line cart
	const [data, error] = await cartLineAdd({
		cartId,
		lines: [{ merchandiseId, quantity }]
	});
	if (error || !data?.cartLinesAdd?.cart?.id) {
		throw new Error(error?.message || 'Failed to add cart line!');
	}

	return data?.cartLinesAdd?.cart;
}

async function createNewCart(session: string | undefined, merchandiseId: string, quantity: number) {
	const [data, error] = await createCart({
		input: {
			buyerIdentity: {
				customerAccessToken: session || null
			},
			lines: [{ merchandiseId, quantity }]
		}
	});
	if (error || !data?.cartCreate?.cart?.id) {
		throw new Error(error?.message || 'Failed to create cart!');
	}

	return data?.cartCreate?.cart;
}

export async function POST({ url, cookies, locals }): Promise<Response> {
	const merchandiseId = url?.searchParams.get('merchandiseId');
	const quantity = Number(url?.searchParams.get('quantity'));

	if (!merchandiseId || quantity <= 0) {
		return new Response(
			JSON.stringify({ error: 'Missing or invalid parameters', cart: null } satisfies CartResponse),
			{
				status: 400
			}
		);
	}

	const customerId = locals?.user?.id;
	let cart: Cart | null = null;

	const session = getCookie(cookies, SESSION_COOKIE);
	const guestCartId = getCookie(cookies, GUEST_CART_ID);
	const customerCartId = getCookie(cookies, CUSTOMER_CART_ID);

	try {
		if ((customerCartId && session) || (guestCartId && !session)) {
			const cartId = session ? customerCartId : guestCartId;

			cart = await updateOrAddCartLine(merchandiseId, quantity, cartId);
		} else {
			cart = await createNewCart(session, merchandiseId, quantity);

			if (session) {
				const error = await updateCustomerMetafields({
					customerId: customerId || '',
					key: cartMetafield.key,
					namespace: cartMetafield.namespace,
					value: cart?.id
				});
				if (error) {
					throw new Error(error?.message || 'An error occured when updating metafields!');
				}

				setCookie(cookies, CUSTOMER_CART_ID, cart?.id);
			} else {
				setCookie(cookies, GUEST_CART_ID, cart?.id);
			}
		}
		return new Response(JSON.stringify({ error: null, cart } satisfies CartResponse), {
			status: 200
		});
	} catch (error) {
		console.log('Error:', error);
		if (typeof error === 'string') {
			return new Response(JSON.stringify({ error, cart: null } satisfies CartResponse), {
				status: 500
			});
		}

		return new Response(
			JSON.stringify({ error: 'Unable to process request!', cart: null } satisfies CartResponse),
			{ status: 500 }
		);
	}
}
