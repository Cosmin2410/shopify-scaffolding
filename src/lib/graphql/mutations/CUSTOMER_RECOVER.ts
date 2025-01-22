import { gql } from 'graphql-request';

export const CUSTOMER_RECOVER = gql`
	#graphql
	mutation CustomerRecover($email: String!) {
		customerRecover(email: $email) {
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
