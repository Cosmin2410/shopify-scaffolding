import { get } from '$lib/server/utils';
import { CUSTOMER_ACCESS_TOKEN_DELETE } from '$lib/graphql/mutations';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';
import type {
	CustomerAccessTokenDeleteMutation,
	CustomerAccessTokenDeleteMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function logoutCustomer(
	variables: CustomerAccessTokenDeleteMutationVariables
): Promise<ErrorResponse> {
	try {
		const response = await get<
			CustomerAccessTokenDeleteMutation,
			CustomerAccessTokenDeleteMutationVariables
		>(CUSTOMER_ACCESS_TOKEN_DELETE, variables);

		const errors = response?.customerAccessTokenDelete?.userErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(errors?.[0]?.message || 'Logout failed. Please try again.');
		}

		return null;
	} catch (error) {
		console.error('Error Logout Customer:', error);
		return createServiceError('Logout failed. Please try again.');
	}
}
