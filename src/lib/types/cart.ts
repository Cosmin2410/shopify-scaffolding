import type { GetCartQuery } from '@/graphql/generated/storefront.generated';

export type Cart = NonNullable<NonNullable<GetCartQuery['cart']>>;

export type CartResponse = {
	error: string | null;
	cart: Cart | null;
};
