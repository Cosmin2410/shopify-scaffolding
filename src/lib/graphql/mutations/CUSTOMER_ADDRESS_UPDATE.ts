import { gql } from 'graphql-request';

export const CUSTOMER_ADDRESS_UPDATE = gql`
	#graphql
	mutation CustomerAddressUpdate(
		$address: MailingAddressInput!
		$customerAccessToken: String!
		$id: ID!
	) {
		customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`;
