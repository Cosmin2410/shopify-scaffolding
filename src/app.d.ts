// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Customer } from '@/graphql/generated/storefront.types';

declare global {
	namespace App {
		interface Error {}
		interface Locals {
			user: Customer | null;
		}
		interface PageData {}
		interface PageState {}
		interface Platform {}
	}
}

export {};
