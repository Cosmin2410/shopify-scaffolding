import { GET_PRODUCTS } from '$lib/graphql/queries';
import { get } from '$lib/server/utils';

import type { PageServerLoad } from './$types';
import type {
	GetProductsQuery,
	GetProductsQueryVariables
} from '$lib/graphql/generated/storefront.generated';

export const load: PageServerLoad = async () => {
	try {
		const data = await get<GetProductsQuery, GetProductsQueryVariables>(GET_PRODUCTS, {
			first: 10
		});

		return { response: data };
	} catch (err) {
		console.log('error:', err);
		return {};
	}
};
