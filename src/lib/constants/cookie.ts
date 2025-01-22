export type CookieType = typeof SESSION_COOKIE | typeof CUSTOMER_CART_ID | typeof GUEST_CART_ID;

export const SESSION_COOKIE = 'session' as const;
export const CUSTOMER_CART_ID = 'customerCartId' as const;
export const GUEST_CART_ID = 'guestCartId' as const;
