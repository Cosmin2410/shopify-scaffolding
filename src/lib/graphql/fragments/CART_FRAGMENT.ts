import { gql } from 'graphql-request';
import { CART_LINES_FRAGMENT } from '.';

export const CART_FRAGMENT = gql`
	fragment CartFragment on Cart {
		id
		createdAt
		updatedAt
		checkoutUrl
		lines(first: 50) {
			...CartLinesFragment
		}
		cost {
			checkoutChargeAmount {
				amount
				currencyCode
			}
		}
		buyerIdentity {
			email
			phone
			customer {
				id
			}
			countryCode
			deliveryAddressPreferences {
				... on MailingAddress {
					address1
					address2
					city
					provinceCode
					countryCodeV2
					zip
				}
			}
			preferences {
				delivery {
					deliveryMethod
				}
			}
		}
	}
	${CART_LINES_FRAGMENT}
`;
