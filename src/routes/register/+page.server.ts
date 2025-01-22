import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from '@/schema';
import { createCustomer, authenticate } from '@/server/services/customerService';
import { SESSION_COOKIE } from '@/constants/cookie';
import { setCookie } from '@/server/utils/cookieManager';

import type { Actions } from './$types';

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, '/');
	}

	const form = await superValidate(event, zod(registerSchema));
	return {
		form
	};
};

export const actions = {
	register: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(registerSchema));
		if (!form.valid) {
			return { form };
		}

		const { email, password, firstName, lastName } = form.data;
		const commonVar = { email, password };

		// Create customer
		const error = await createCustomer({ ...commonVar, firstName, lastName });
		if (error) {
			return fail(400, {
				form,
				errorMessage: error?.message
			});
		}

		// Login customer
		const [token, errorAuth] = await authenticate({ ...commonVar });
		if (errorAuth) {
			return fail(400, {
				form,
				errorMessage: errorAuth?.message || 'Register failed. Please try again.'
			});
		}

		if (token) {
			setCookie(cookies, SESSION_COOKIE, token);

			return {
				form
			};
		}
	}
} satisfies Actions;
