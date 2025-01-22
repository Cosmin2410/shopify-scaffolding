import { shopifyApiProject, ApiType } from '@shopify/api-codegen-preset';

export default {
	schema: 'SECRET_API_ENDPOINT',
	documents: ['src/lib/graphql/*.{js,ts,jsx,tsx}'],
	projects: {
		default: shopifyApiProject({
			apiType: ApiType.Storefront,
			apiVersion: '2024-10',
			documents: ['src/lib/graphql/**/*.{js,ts,jsx,tsx}', '!src/lib/graphql/admin/**'],
			outputDir: 'src/lib/graphql/generated',
			declarations: false
		})
	}
};
