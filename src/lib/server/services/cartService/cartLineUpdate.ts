import { get } from '$lib/server/utils';
import { CART_LINES_UPDATE } from '$lib/graphql/mutations';

import { type Response, createServiceError } from '$lib/server/utils/response';
import type {
	CartLinesUpdateMutation,
	CartLinesUpdateMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function cartLineUpdate(
	variables: CartLinesUpdateMutationVariables
): Promise<Response<CartLinesUpdateMutation>> {
	try {
		const response = await get<CartLinesUpdateMutation, CartLinesUpdateMutationVariables>(
			CART_LINES_UPDATE,
			{
				...variables
			}
		);

		const errors = response?.cartLinesUpdate?.userErrors;

		if (errors && errors?.length > 0) {
			return [
				null,
				createServiceError(
					errors?.[0]?.message || 'Failed to update cart line.',
					errors?.[0]?.code || undefined
				)
			];
		}

		return [response || null, null];
	} catch (error) {
		console.error('Error updating cart line:', error);
		return [null, createServiceError('Failed to update cart line.')];
	}
}
