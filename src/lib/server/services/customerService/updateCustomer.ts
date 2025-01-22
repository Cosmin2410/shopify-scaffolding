import { get } from '$lib/server/utils';
import { CUSTOMER_UPDATE } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerUpdateMutation,
	CustomerUpdateMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function updateCustomer(
	variables: CustomerUpdateMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<CustomerUpdateMutation, CustomerUpdateMutationVariables>(
			CUSTOMER_UPDATE,
			variables
		);

		const errors = response?.customerUpdate?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(
				errors?.[0]?.message || 'Profile update failed. Please try again.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Error Updating User:', error);
		return createServiceError('Profile update failed. Please try again.');
	}
}
