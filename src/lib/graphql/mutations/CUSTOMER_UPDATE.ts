import { gql } from 'graphql-request';

export const CUSTOMER_UPDATE = gql`
	#graphql
	mutation CustomerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
		customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
			customer {
				firstName
				email
				displayName
				createdAt
				acceptsMarketing
				lastName
				id
				updatedAt
				phone
			}
			customerUserErrors {
				message
				field
				code
			}
		}
	}
`;
