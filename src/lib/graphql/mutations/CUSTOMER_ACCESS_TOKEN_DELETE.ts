import { gql } from 'graphql-request';

export const CUSTOMER_ACCESS_TOKEN_DELETE = gql`
	#graphql
	mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
		customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
			deletedAccessToken
			deletedCustomerAccessTokenId
			userErrors {
				field
				message
			}
		}
	}
`;
