import { gql } from 'graphql-request';
import { CART_FRAGMENT } from '../fragments';

export const CART_CREATE = gql`
	#graphql
	mutation CartCreate($input: CartInput!) {
		cartCreate(input: $input) {
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
