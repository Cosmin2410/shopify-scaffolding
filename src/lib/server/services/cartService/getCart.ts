import { get } from '$lib/server/utils';
import { GET_CART } from '$lib/graphql/queries';

import { type Response, createServiceError } from '$lib/server/utils/response';
import type {
	GetCartQuery,
	GetCartQueryVariables
} from '@/graphql/generated/storefront.generated.js';

export async function getCart(variables: GetCartQueryVariables): Promise<Response<GetCartQuery>> {
	try {
		const response = await get<GetCartQuery, GetCartQueryVariables>(GET_CART, {
			...variables
		});

		return [response || null, null];
	} catch (error) {
		console.error('Error fetching cart:', error);
		return [null, createServiceError('Failed to fetch cart.')];
	}
}
