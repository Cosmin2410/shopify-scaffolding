import { get } from '$lib/server/utils';
import { CUSTOMER_UPDATE_PASSWORD } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerUpdateMutation,
	CustomerUpdatePasswordMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function updateCustomerPassword(
	variables: CustomerUpdatePasswordMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<CustomerUpdateMutation, CustomerUpdatePasswordMutationVariables>(
			CUSTOMER_UPDATE_PASSWORD,
			variables
		);

		const errors = response?.customerUpdate?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(
				errors?.[0]?.message || 'Password update failed. Please try again.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Error Updating Password User:', error);
		return createServiceError('Password update failed. Please try again.');
	}
}
