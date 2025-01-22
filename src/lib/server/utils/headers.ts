import { env } from '$env/dynamic/private';

export function createHeaders() {
	const endpoint = env.SECRET_API_ENDPOINT;
	const aceess_token = env.SECRET_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

	if (!aceess_token) {
		throw new Error('SECRET_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined');
	}

	if (!endpoint) {
		throw new Error('SECRET_API_ENDPOINT is not defined');
	}

	const header = {
		'X-Shopify-Storefront-Access-Token': aceess_token,
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};

	return { header, endpoint };
}

export function createAdminHeaders() {
	const endpoint = env.SECRET_ADMIN_ENDPOINT;
	const aceess_token = env.SECRET_SHOPIFY_ADMIN_ACCESS_TOKEN;

	if (!aceess_token) {
		throw new Error('SECRET_SHOPIFY_ADMIN_ACCESS_TOKEN is not defined');
	}

	if (!endpoint) {
		throw new Error('SECRET_ADMIN_ENDPOINT is not defined');
	}

	const header = {
		'X-Shopify-Access-Token': aceess_token,
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};

	return { header, endpoint };
}
