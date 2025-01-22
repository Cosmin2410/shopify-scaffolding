import { get } from '$lib/server/utils';
import { CUSTOMER_CREATE } from '$lib/graphql/mutations';
import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';

import type {
	CustomerCreateMutation,
	CustomerCreateMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function createCustomer(
	variables: CustomerCreateMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<CustomerCreateMutation, CustomerCreateMutationVariables>(
			CUSTOMER_CREATE,
			variables
		);

		const errors = response?.customerCreate?.customerUserErrors;

		if (errors?.length) {
			return createServiceError(
				errors?.[0]?.message || 'Register failed. Please try again.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Error Creating User:', error);
		return createServiceError('Register failed. Please try again.');
	}
}
