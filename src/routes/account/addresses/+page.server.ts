import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { createAddressSchema } from '@/schema';
import { getCookie } from '@/server/utils/cookieManager';
import { SESSION_COOKIE } from '@/constants/cookie';
import { createAddress, updateAddress, deleteAddress } from '@/server/services/addressService';

import type { Actions } from './$types';

export const load = async (event) => {
	const form = await superValidate(event, zod(createAddressSchema));

	return {
		form
	};
};

export const actions = {
	upsertAddress: async ({ request, cookies, url }) => {
		const form = await superValidate(request, zod(createAddressSchema));
		if (!form.valid) {
			return { form };
		}

		const session = getCookie(cookies, SESSION_COOKIE);
		if (!session) {
			throw redirect(302, '/login');
		}

		const addressId = url?.searchParams.get('id');

		const { address, firstName, lastName, phone, province, zip, city, country } = form.data;

		const addressVariable = {
			address1: address,
			firstName,
			lastName,
			phone,
			province,
			zip,
			city,
			country
		};

		let error;

		if (addressId) {
			error = await updateAddress({
				id: addressId,
				customerAccessToken: session,
				address: addressVariable
			});
		} else {
			error = await createAddress({
				customerAccessToken: session,
				address: addressVariable
			});
		}

		if (error) {
			return fail(400, {
				form,
				errorMessage: error?.message
			});
		}

		return {
			form
		};
	},

	deleteAddress: async ({ cookies, url }) => {
		const session = getCookie(cookies, SESSION_COOKIE);
		if (!session) {
			throw redirect(302, '/login');
		}

		const addressId = url?.searchParams.get('id');

		if (!addressId) {
			return fail(400, {
				errorMessage: 'Failed to delete address. Please try again.'
			});
		}

		const error = await deleteAddress({
			customerAccessToken: session,
			id: addressId
		});

		if (error) {
			return fail(400, {
				errorMessage: 'Failed to delete address. Please try again.'
			});
		}
	}
} satisfies Actions;
