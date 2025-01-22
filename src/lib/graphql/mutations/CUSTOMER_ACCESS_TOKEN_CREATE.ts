import { gql } from 'graphql-request';

export const CUSTOMER_ACCESS_TOKEN_CREATE = gql`
	#graphql
	mutation CustomerAccessTokenCreate($email: String!, $password: String!) {
		customerAccessTokenCreate(input: { email: $email, password: $password }) {
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
