import { get } from '$lib/server/utils';
import { CUSTOMER_RECOVER } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerRecoverMutation,
	CustomerRecoverMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function recoverCustomer(
	variables: CustomerRecoverMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<CustomerRecoverMutation, CustomerRecoverMutationVariables>(
			CUSTOMER_RECOVER,
			variables
		);

		const errors = response?.customerRecover?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(
				errors?.[0]?.message || 'Recover email failed. Please try again.',
				errors?.[0]?.code || undefined
			);
		}

		return null;
	} catch (error) {
		console.error('Recover email failed:', error);
		return createServiceError('Recover email failed. Please try again.');
	}
}
