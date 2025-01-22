import { gql } from 'graphql-request';

export const CUSTOMER_CREATE = gql`
	#graphql
	mutation CustomerCreate(
		$email: String!
		$password: String!
		$firstName: String
		$lastName: String
	) {
		customerCreate(
			input: { email: $email, password: $password, firstName: $firstName, lastName: $lastName }
		) {
			customer {
				id
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
