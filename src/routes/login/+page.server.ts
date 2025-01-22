import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { authenticate } from '@/server/services/customerService';
import { SESSION_COOKIE } from '@/constants/cookie';
import { setCookie } from '@/server/utils/cookieManager';

import type { Actions } from './$types';

const formSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email({ message: 'Email must be a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim()
});

export const load = async (event) => {
	if (event.locals.user) {
		const redirectTo = event.url.searchParams.get('redirectTo') || '';
		throw redirect(302, `/${redirectTo?.slice(1)}`);
	}

	const form = await superValidate(event, zod(formSchema));
	return { form };
};

export const actions = {
	login: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return { form };
		}

		const { email, password } = form.data;
		const [token, error] = await authenticate({ email, password });

		if (error) {
			return fail(400, {
				form,
				errorMessage: error.message
			});
		}

		if (token) {
			setCookie(cookies, SESSION_COOKIE, token);

			return {
				form
			};
		} else {
			return fail(400, {
				form,
				errorMessage: 'Authentication Failed!'
			});
		}
	}
} satisfies Actions;
