import { gql } from 'graphql-request';

export const CUSTOMER_UPDATE_PASSWORD = gql`
	#graphql
	mutation CustomerUpdatePassword($password: String!, $customerAccessToken: String!) {
		customerUpdate(customer: { password: $password }, customerAccessToken: $customerAccessToken) {
			customer {
				id
				updatedAt
			}
			customerUserErrors {
				message
				field
				code
			}
		}
	}
`;
