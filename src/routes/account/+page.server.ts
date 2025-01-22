import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	if (url.pathname === '/account') {
		throw redirect(302, '/account/profile');
	}
};
