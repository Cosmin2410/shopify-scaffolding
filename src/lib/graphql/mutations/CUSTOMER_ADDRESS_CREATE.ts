import { gql } from 'graphql-request';

export const CUSTOMER_ADDRESS_CREATE = gql`
	#graphql
	mutation CustomerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
		customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
