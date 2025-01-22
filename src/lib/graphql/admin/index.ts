import { gql } from 'graphql-tag';

export const GET_ADMIN_CUSTOMER = gql`
	query Customer($id: ID!, $key: String!, $namespace: String!) {
		customer(id: $id) {
			id
			metafield(key: $key, namespace: $namespace) {
				value
				type
				key
				type
				namespace
			}
		}
	}
`;

export const ADMIN_CUSTOMER_UPDATE = gql`
	mutation customerUpdate($id: ID!, $namespace: String!, $key: String!, $value: String!) {
		customerUpdate(
			input: {
				id: $id
				metafields: {
					key: $key
					namespace: $namespace
					value: $value
					type: "single_line_text_field"
				}
			}
		) {
			customer {
				id
				metafield(key: $key) {
					id
					value
					namespace
				}
			}
			userErrors {
				field
				message
			}
		}
	}
`;
