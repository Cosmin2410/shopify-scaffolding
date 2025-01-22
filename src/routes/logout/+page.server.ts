import { redirect } from '@sveltejs/kit';
import { logoutCustomer } from '$lib/server/services/customerService';
import { clearCookie } from '@/server/utils/cookieManager';
import { SESSION_COOKIE, CUSTOMER_CART_ID } from '@/constants/cookie';

import type { Actions } from './$types';

export const load = async () => {
	redirect(302, '/');
};

export const actions = {
	logout: async ({ cookies }) => {
		const session = cookies.get('session');

		if (!session) {
			throw redirect(302, '/');
		}

		const error = await logoutCustomer({ customerAccessToken: session });
		if (error) {
			console.error('Logout server error:', error?.message);
		}

		clearCookie(cookies, SESSION_COOKIE);
		clearCookie(cookies, CUSTOMER_CART_ID);

		throw redirect(302, '/');
	}
} satisfies Actions;
