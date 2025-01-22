import { get } from '$lib/server/utils';
import { CART_CREATE } from '$lib/graphql/mutations';

import { type Response, createServiceError } from '$lib/server/utils/response';
import type {
	CartCreateMutation,
	CartCreateMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function createCart(
	variables: CartCreateMutationVariables
): Promise<Response<CartCreateMutation>> {
	try {
		const response = await get<CartCreateMutation, CartCreateMutationVariables>(CART_CREATE, {
			...variables
		});

		const errors = response?.cartCreate?.userErrors;
		if (errors && errors?.length > 0) {
			return [
				null,
				createServiceError(
					errors?.[0]?.message || 'Failed to create cart.',
					errors?.[0]?.code || undefined
				)
			];
		}

		return [response || null, null];
	} catch (error) {
		console.error('Error creating cart:', error);
		return [null, createServiceError('Failed to create cart.')];
	}
}
