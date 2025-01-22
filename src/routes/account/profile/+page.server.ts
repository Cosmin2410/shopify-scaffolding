import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { handleLoginRedirect } from '@/utils';
import { updateFormSchema, updatePasswordSchema } from '@/schema';
import { SESSION_COOKIE } from '@/constants/cookie';
import { clearCookie, getCookie } from '@/server/utils/cookieManager';
import {
	updateCustomer,
	updateCustomerPassword,
	logoutCustomer
} from '@/server/services/customerService';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const initialValues = {
		firstName: event.locals?.user?.firstName || undefined,
		lastName: event.locals?.user?.lastName || undefined,
		email: event.locals?.user?.email || undefined,
		phone: event.locals?.user?.phone || undefined
	};

	const updateProfileForm = await superValidate(initialValues, zod(updateFormSchema));
	const updatePasswordForm = await superValidate(event.request, zod(updatePasswordSchema));
	return {
		updateProfileForm,
		updatePasswordForm
	};
};

export const actions = {
	profile: async ({ request, cookies }) => {
		const session = getCookie(cookies, SESSION_COOKIE);
		if (!session) {
			throw redirect(302, '/');
		}

		const form = await superValidate(request, zod(updateFormSchema));
		if (!form.valid) {
			return { form };
		}

		const error = await updateCustomer({
			customerAccessToken: session,
			customer: { ...form.data }
		});

		if (error) {
			return fail(400, {
				form,
				errorMessage: error?.message
			});
		}

		return { form };
	},

	passwordUpdate: async (event) => {
		const { cookies, request } = event;

		const session = getCookie(cookies, SESSION_COOKIE);
		if (!session) {
			throw redirect(302, '/');
		}

		const form = await superValidate(request, zod(updatePasswordSchema));
		if (!form.valid) {
			return { form };
		}

		const error = await updateCustomerPassword({
			customerAccessToken: session,
			password: form?.data?.password
		});

		if (error) {
			return fail(400, {
				form,
				errorMessage: error?.message
			});
		}

		const errorLogout = await logoutCustomer({ customerAccessToken: session });
		if (errorLogout) {
			console.error('Error logging out:', errorLogout);
		}

		clearCookie(cookies, SESSION_COOKIE);
		throw redirect(302, handleLoginRedirect(event, 'Log in again to access the page!'));
	}
} satisfies Actions;
