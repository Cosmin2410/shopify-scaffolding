import { get } from '$lib/server/utils';
import { CUSTOMER_RESET_BY_URL } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerResetByUrlMutation,
	CustomerResetByUrlMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function resetCustomer(
	variables: CustomerResetByUrlMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<CustomerResetByUrlMutation, CustomerResetByUrlMutationVariables>(
			CUSTOMER_RESET_BY_URL,
			variables
		);

		const errors = response?.customerResetByUrl?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(
				errors?.[0]?.message || 'Failed to reset password. Please try again.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Error Reset User:', error);
		return createServiceError('Failed to reset password. Please try again.');
	}
}
