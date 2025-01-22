import { gql } from 'graphql-request';

export const CART_LINES_FRAGMENT = gql`
	fragment CartLinesFragment on BaseCartLineConnection {
		edges {
			node {
				id
				quantity
				merchandise {
					... on ProductVariant {
						id
						title
						product {
							title
							description
							priceRange {
								maxVariantPrice {
									amount
									currencyCode
								}
							}
						}
					}
				}
			}
		}
	}
`;
