import { gql } from 'graphql-request';

export const CUSTOMER_ADDRESS_DELETE = gql`
	#graphql
	mutation CustomerAddressDelete($customerAccessToken: String!, $id: ID!) {
		customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
