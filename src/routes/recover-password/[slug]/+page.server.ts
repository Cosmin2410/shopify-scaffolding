import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { resetCustomer } from '@/server/services/customerService';
import { handleLoginRedirect } from '@/utils';
import { resetPasswordSchema } from '@/schema';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		redirect(302, '/');
	}

	const form = await superValidate(event.request, zod(resetPasswordSchema));

	return {
		form
	};
};

export const actions = {
	resetPassword: async (event) => {
		const { request } = event;
		const resetToken = event.url.searchParams.get('token');

		const form = await superValidate(request, zod(resetPasswordSchema));
		if (!form.valid) {
			return { form };
		}
		const { password } = form.data;

		if (!resetToken) {
			return fail(400, {
				form,
				errorMessage: 'No reset token found, try sending another reset email.'
			});
		}

		const error = await resetCustomer({
			resetUrl: decodeURIComponent(resetToken),
			password
		});

		if (error) {
			return fail(400, {
				form,
				errorMessage: error?.message
			});
		}

		throw redirect(
			302,
			handleLoginRedirect(event, 'Please login after changing the password', true)
		);
	}
} satisfies Actions;
