import { gql } from 'graphql-request';

export const GET_PRODUCTS = gql`
	#graphql
	query GetProducts($first: Int!) {
		products(first: $first) {
			nodes {
				id
				createdAt
				description
				isGiftCard
				productType
				publishedAt
				tags
				title
				vendor
				updatedAt
				variants(first: 10) {
					edges {
						node {
							id
						}
					}
				}
				priceRange {
					maxVariantPrice {
						amount
						currencyCode
					}
					minVariantPrice {
						amount
						currencyCode
					}
				}

				images(first: $first) {
					nodes {
						width
						id
						height
						altText
						url
					}
					pageInfo {
						endCursor
						hasNextPage
						hasPreviousPage
						startCursor
					}
				}
			}
			pageInfo {
				startCursor
				hasPreviousPage
				hasNextPage
				endCursor
			}
		}
	}
`;
