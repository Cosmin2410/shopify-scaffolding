import { get } from '$lib/server/utils';
import { CUSTOMER_ADDRESS_DELETE } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerAddressDeleteMutation,
	CustomerAddressDeleteMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function deleteAddress(
	variables: CustomerAddressDeleteMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<
			CustomerAddressDeleteMutation,
			CustomerAddressDeleteMutationVariables
		>(CUSTOMER_ADDRESS_DELETE, variables);

		const errors = response?.customerAddressDelete?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(
				errors?.[0]?.message || 'Failed to delete address. Please try again.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Error Deleting Address User:', error);
		return createServiceError('Failed to delete address. Please try again.');
	}
}
