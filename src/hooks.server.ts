import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '@/utils';
import { getCustomer, logoutCustomer } from '@/server/services/customerService';
import { getAdminCustomerMetafields } from '@/server/services/adminService';
import { cartMetafield } from '@/constants/metafield';
import { getCookie, clearCookie, setCookie } from '@/server/utils/cookieManager';
import { SESSION_COOKIE, CUSTOMER_CART_ID } from '$lib/constants/cookie';

import type { Handle } from '@sveltejs/kit';
import type { Customer } from '@/graphql/generated/storefront.types';

const protectedRoutes = ['/account'];

export const handle: Handle = async ({ event, resolve }) => {
	const session = getCookie(event?.cookies, SESSION_COOKIE);
	const customerCartId = getCookie(event?.cookies, CUSTOMER_CART_ID);

	event.locals.user = null;

	if (session) {
		const [customer, error] = await getCustomer(session);

		//! Some nasty error occured and customer needs to login again
		if (!customer?.id || error) {
			const errorLogout = await logoutCustomer({ customerAccessToken: session });
			clearCookie(event.cookies, SESSION_COOKIE);

			console.log('errorLogout', errorLogout?.message);
		}

		// Get the customer cartId if the cookie expired or was deleted
		if (!customerCartId && customer?.id) {
			const [value, error] = await getAdminCustomerMetafields({
				customerId: customer?.id,
				key: cartMetafield.key,
				namespace: cartMetafield.namespace
			});

			if (value && !error) {
				setCookie(event.cookies, CUSTOMER_CART_ID, value);
			}
		}

		event.locals.user = customer as Customer;
	}

	if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		if (!event.locals.user) {
			console.log('Access Denied: User not authenticated.');
			throw redirect(302, handleLoginRedirect(event));
		}
	}

	return await resolve(event);
};
