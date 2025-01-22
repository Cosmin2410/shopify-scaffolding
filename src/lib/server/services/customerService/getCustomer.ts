import { get } from '$lib/server/utils';
import { GET_CUSTOMER } from '$lib/graphql/queries';
import { type Response, createServiceError } from '$lib/server/utils/response';

import type { Customer } from '@/graphql/generated/storefront.types';
import type {
	GetCustomerQuery,
	GetCustomerQueryVariables
} from '@/graphql/generated/storefront.generated.js';

export async function getCustomer(sessionToken: string): Promise<Response<Customer>> {
	try {
		const response = await get<GetCustomerQuery, GetCustomerQueryVariables>(GET_CUSTOMER, {
			customerAccessToken: sessionToken
		});

		return [response?.customer as Customer, null];
	} catch (error) {
		console.error('Error fetching customer:', error);
		return [null, createServiceError('An unexpected error occurred. Please try again later.')];
	}
}
