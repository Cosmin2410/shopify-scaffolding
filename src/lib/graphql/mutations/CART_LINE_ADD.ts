import { gql } from 'graphql-request';
import { CART_FRAGMENT } from '../fragments';

export const CART_LINE_ADD = gql`
	#graphql
	mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
			cart {
				...CartFragment
			}
			userErrors {
				field
				message
			}
		}
	}
	${CART_FRAGMENT}
`;
