import { get } from '$lib/server/utils';
import { CART_LINES_REMOVE } from '$lib/graphql/mutations';

import { type Response, createServiceError } from '$lib/server/utils/response';
import type {
	CartLinesRemoveMutation,
	CartLinesRemoveMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function cartLineRemove(
	variables: CartLinesRemoveMutationVariables
): Promise<Response<CartLinesRemoveMutation>> {
	try {
		const response = await get<CartLinesRemoveMutation, CartLinesRemoveMutationVariables>(
			CART_LINES_REMOVE,
			{
				...variables
			}
		);

		const errors = response?.cartLinesRemove?.userErrors;

		if (errors && errors?.length > 0) {
			return [
				null,
				createServiceError(
					errors?.[0]?.message || 'Failed to remove item from cart.',
					errors?.[0]?.code || undefined
				)
			];
		}

		return [response || null, null];
	} catch (error) {
		console.error('Error updating cart line:', error);
		return [null, createServiceError('Failed to remove item from cart.')];
	}
}
