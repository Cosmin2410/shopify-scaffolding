import { getAdmin } from '@/server/utils';
import { GET_ADMIN_CUSTOMER } from '@/graphql/admin';

import { type Response, createServiceError } from '$lib/server/utils/response';

interface VariablesType {
	customerId: string;
	namespace: string;
	key: string;
}

interface CustomerMetafieldResponse {
	customer: {
		id: string;
		metafield: {
			value: string;
			type: string;
			key: string;
			namespace: string;
		} | null;
	} | null;
}

export async function getAdminCustomerMetafields(
	variables: VariablesType
): Promise<Response<string | null>> {
	const { customerId, namespace, key } = variables;

	try {
		const response: CustomerMetafieldResponse | undefined = await getAdmin(GET_ADMIN_CUSTOMER, {
			id: customerId,
			key,
			namespace
		});
		const metafieldValue = response?.customer?.metafield?.value;

		return [metafieldValue || null, null];
	} catch (error) {
		console.error('Failed to get admin customer:', error);
		return [null, createServiceError('Failed to get admin customer.')];
	}
}
