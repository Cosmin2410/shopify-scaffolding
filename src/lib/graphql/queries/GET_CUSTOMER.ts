import { gql } from 'graphql-request';

export const GET_CUSTOMER = gql`
	#graphql
	query GetCustomer($customerAccessToken: String!) {
		customer(customerAccessToken: $customerAccessToken) {
			id
			createdAt
			displayName
			email
			firstName
			lastName
			updatedAt
			phone
			addresses(first: 20) {
				edges {
					node {
						id
						address1
						firstName
						lastName
						name
						phone
						province
						zip
						city
						country
					}
				}
			}
		}
	}
`;
