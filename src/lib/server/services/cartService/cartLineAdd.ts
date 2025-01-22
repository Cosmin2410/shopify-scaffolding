import { get } from '$lib/server/utils';
import { CART_LINE_ADD } from '$lib/graphql/mutations';

import { type Response, createServiceError } from '$lib/server/utils/response';
import type {
	CartLinesAddMutation,
	CartLinesAddMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function cartLineAdd(
	variables: CartLinesAddMutationVariables
): Promise<Response<CartLinesAddMutation>> {
	try {
		const response = await get<CartLinesAddMutation, CartLinesAddMutationVariables>(CART_LINE_ADD, {
			...variables
		});

		const errors = response?.cartLinesAdd?.userErrors;

		if (errors && errors?.length > 0) {
			return [null, createServiceError(errors?.[0]?.message || 'Failed to add item to cart.')];
		}

		return [response || null, null];
	} catch (error) {
		console.error('Error updating cart line:', error);
		return [null, createServiceError('Failed to add item to cart.')];
	}
}
