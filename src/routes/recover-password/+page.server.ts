import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { emailSchema } from '@/schema';
import { recoverCustomer } from '@/server/services/customerService';

import type { Actions } from './$types';

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, '/');
	}

	const form = await superValidate(event, zod(emailSchema));
	return {
		form,
		success: false
	};
};

export const actions = {
	recoverPassword: async ({ request }) => {
		const form = await superValidate(request, zod(emailSchema));
		if (!form.valid) {
			return { form };
		}

		const { email } = form.data;

		const error = await recoverCustomer({ email });
		if (error) {
			return fail(400, {
				form,
				errorMessage: error?.message,
				success: false
			});
		}

		return {
			form,
			success: true
		};
	}
} satisfies Actions;
