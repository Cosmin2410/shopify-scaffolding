import { gql } from 'graphql-request';
import { CART_FRAGMENT } from '../fragments';

export const GET_CART = gql`
	query GetCart($id: ID!) {
		cart(id: $id) {
			...CartFragment
		}
	}
	${CART_FRAGMENT}
`;
