import { get } from '$lib/server/utils';
import { GET_CART_LINE } from '$lib/graphql/queries';

import { type Response, createServiceError } from '$lib/server/utils/response';
import type {
	GetCartLineQuery,
	GetCartLineQueryVariables
} from '@/graphql/generated/storefront.generated.js';

export async function getCartLine(
	variables: GetCartLineQueryVariables
): Promise<Response<GetCartLineQuery>> {
	try {
		const response = await get<GetCartLineQuery, GetCartLineQueryVariables>(GET_CART_LINE, {
			...variables
		});

		return [response || null, null];
	} catch (error) {
		console.error('Error fetching cart line:', error);
		return [null, createServiceError('Failed to fetch cart line.')];
	}
}
