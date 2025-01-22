import { gql } from 'graphql-request';

export const CUSTOMER_RESET_BY_URL = gql`
	#graphql
	mutation CustomerResetByUrl($resetUrl: URL!, $password: String!) {
		customerResetByUrl(password: $password, resetUrl: $resetUrl) {
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
