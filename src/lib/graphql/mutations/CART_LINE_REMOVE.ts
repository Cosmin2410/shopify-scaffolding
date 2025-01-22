import { gql } from 'graphql-request';
import { CART_FRAGMENT } from '../fragments';

export const CART_LINES_REMOVE = gql`
	mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
		cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
			cart {
				...CartFragment
			}
			userErrors {
				code
				field
				message
			}
		}
	}
	${CART_FRAGMENT}
`;
