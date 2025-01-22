import { gql } from 'graphql-request';

export const GET_CART_LINE = gql`
	#graphql
	query GetCartLine($id: ID!) {
		cart(id: $id) {
			id
			lines(first: 50) {
				edges {
					node {
						id
						quantity
						merchandise {
							... on ProductVariant {
								id
							}
						}
					}
				}
			}
		}
	}
`;
