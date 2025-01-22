import { gql } from 'graphql-request';
import { CART_FRAGMENT } from '../fragments';

export const CART_LINES_UPDATE = gql`
	#graphql
	mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
