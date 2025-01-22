import { get } from '$lib/server/utils';
import { CUSTOMER_ADDRESS_UPDATE } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerAddressUpdateMutation,
	CustomerAddressUpdateMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function updateAddress(
	variables: CustomerAddressUpdateMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<
			CustomerAddressUpdateMutation,
			CustomerAddressUpdateMutationVariables
		>(CUSTOMER_ADDRESS_UPDATE, variables);

		const errors = response?.customerAddressUpdate?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(
				errors?.[0]?.message || 'Failed to update address. Please try again.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Error Updating Address User:', error);
		return createServiceError('Failed to update address. Please try again.');
	}
}
