import { getAdmin } from '@/server/utils';
import { ADMIN_CUSTOMER_UPDATE } from '@/graphql/admin';

import { type ErrorResponse, createServiceError } from '$lib/server/utils/response';

interface VariablesType {
	customerId: string;
	namespace: string;
	key: string;
	value: string;
}

interface UserError {
	field?: string[];
	message: string;
}

interface Metafield {
	id: string;
	value: string;
	namespace: string;
}

interface Customer {
	id: string;
	metafield?: Metafield;
}

interface CustomerUpdateResponse {
	customerUpdate: {
		customer?: Customer;
		userErrors: UserError[];
	};
}

export async function updateCustomerMetafields(variables: VariablesType): Promise<ErrorResponse> {
	const { customerId, namespace, key, value } = variables;

	try {
		const variables = {
			id: customerId,
			namespace,
			key,
			value
		};

		const response: CustomerUpdateResponse | undefined = await getAdmin(
			ADMIN_CUSTOMER_UPDATE,
			variables
		);

		const errors = response?.customerUpdate?.userErrors;

		if (errors && errors?.length > 0) {
			return createServiceError(errors?.[0]?.message || 'Failed to update customer metafields.');
		}

		return null;
	} catch (error) {
		console.error('Error Updating Customer Metafields:', error);
		return createServiceError('Error Updating Customer Metafields.');
	}
}
