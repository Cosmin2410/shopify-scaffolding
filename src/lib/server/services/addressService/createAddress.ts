import { get } from '$lib/server/utils';
import { CUSTOMER_ADDRESS_CREATE } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerAddressCreateMutation,
	CustomerAddressCreateMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function createAddress(
	variables: CustomerAddressCreateMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<
			CustomerAddressCreateMutation,
			CustomerAddressCreateMutationVariables
		>(CUSTOMER_ADDRESS_CREATE, variables);

		const errors = response?.customerAddressCreate?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(
				errors?.[0]?.message || 'Failed to create address.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Error Creating Address User:', error);
		return createServiceError('Failed to create address. Please try again.');
	}
}
