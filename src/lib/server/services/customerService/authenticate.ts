import { get } from '$lib/server/utils';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '$lib/graphql/mutations';
import { type Response, createServiceError } from '$lib/server/utils/response';

import type {
	CustomerAccessTokenCreateMutation,
	CustomerAccessTokenCreateMutationVariables
} from '@/graphql/generated/storefront.generated.js';

export async function authenticate(
	variables: CustomerAccessTokenCreateMutationVariables
): Promise<Response<string>> {
	try {
		const res = await get<
			CustomerAccessTokenCreateMutation,
			CustomerAccessTokenCreateMutationVariables
		>(CUSTOMER_ACCESS_TOKEN_CREATE, variables);

		const token = res?.customerAccessTokenCreate?.customerAccessToken?.accessToken || null;
		const errors = res?.customerAccessTokenCreate?.customerUserErrors;

		if (errors && errors?.length > 0) {
			return [
				null,
				createServiceError(
					errors?.[0]?.message || 'Authentication Failed!',
					errors?.[0]?.code || undefined
				)
			];
		}

		return [token, null];
	} catch (error) {
		console.error('Authentication error:', error);
		return [null, createServiceError('An unexpected error occurred. Please try again later.')];
	}
}
