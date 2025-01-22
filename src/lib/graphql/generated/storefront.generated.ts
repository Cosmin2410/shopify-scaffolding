/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontTypes from './storefront.types';

export type CartFragmentFragment = (
  Pick<StorefrontTypes.Cart, 'id' | 'createdAt' | 'updatedAt' | 'checkoutUrl'>
  & { lines: { edges: Array<{ node: (
        Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
        & { merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
          & { product: (
            Pick<StorefrontTypes.Product, 'title' | 'description'>
            & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
          ) }
        ) }
      ) | (
        Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
        & { merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
          & { product: (
            Pick<StorefrontTypes.Product, 'title' | 'description'>
            & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
          ) }
        ) }
      ) }> }, cost: { checkoutChargeAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, buyerIdentity: (
    Pick<StorefrontTypes.CartBuyerIdentity, 'email' | 'phone' | 'countryCode'>
    & { customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>>, deliveryAddressPreferences: Array<Pick<StorefrontTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'provinceCode' | 'countryCodeV2' | 'zip'>>, preferences?: StorefrontTypes.Maybe<{ delivery?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CartDeliveryPreference, 'deliveryMethod'>> }> }
  ) }
);

export type CartLinesFragmentFragment = { edges: Array<{ node: (
      Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
      & { merchandise: (
        Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
        & { product: (
          Pick<StorefrontTypes.Product, 'title' | 'description'>
          & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
        ) }
      ) }
    ) | (
      Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
      & { merchandise: (
        Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
        & { product: (
          Pick<StorefrontTypes.Product, 'title' | 'description'>
          & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
        ) }
      ) }
    ) }> };

export type CartCreateMutationVariables = StorefrontTypes.Exact<{
  input: StorefrontTypes.CartInput;
}>;


export type CartCreateMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'createdAt' | 'updatedAt' | 'checkoutUrl'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) }> }, cost: { checkoutChargeAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, buyerIdentity: (
        Pick<StorefrontTypes.CartBuyerIdentity, 'email' | 'phone' | 'countryCode'>
        & { customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>>, deliveryAddressPreferences: Array<Pick<StorefrontTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'provinceCode' | 'countryCodeV2' | 'zip'>>, preferences?: StorefrontTypes.Maybe<{ delivery?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CartDeliveryPreference, 'deliveryMethod'>> }> }
      ) }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'code' | 'field' | 'message'>> }> };

export type CartLinesUpdateMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput;
}>;


export type CartLinesUpdateMutation = { cartLinesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'createdAt' | 'updatedAt' | 'checkoutUrl'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) }> }, cost: { checkoutChargeAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, buyerIdentity: (
        Pick<StorefrontTypes.CartBuyerIdentity, 'email' | 'phone' | 'countryCode'>
        & { customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>>, deliveryAddressPreferences: Array<Pick<StorefrontTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'provinceCode' | 'countryCodeV2' | 'zip'>>, preferences?: StorefrontTypes.Maybe<{ delivery?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CartDeliveryPreference, 'deliveryMethod'>> }> }
      ) }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'code' | 'field' | 'message'>> }> };

export type CartLinesAddMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type CartLinesAddMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'createdAt' | 'updatedAt' | 'checkoutUrl'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) }> }, cost: { checkoutChargeAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, buyerIdentity: (
        Pick<StorefrontTypes.CartBuyerIdentity, 'email' | 'phone' | 'countryCode'>
        & { customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>>, deliveryAddressPreferences: Array<Pick<StorefrontTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'provinceCode' | 'countryCodeV2' | 'zip'>>, preferences?: StorefrontTypes.Maybe<{ delivery?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CartDeliveryPreference, 'deliveryMethod'>> }> }
      ) }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type CartLinesRemoveMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lineIds: Array<StorefrontTypes.Scalars['ID']['input']> | StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartLinesRemoveMutation = { cartLinesRemove?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'createdAt' | 'updatedAt' | 'checkoutUrl'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
              & { product: (
                Pick<StorefrontTypes.Product, 'title' | 'description'>
                & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
              ) }
            ) }
          ) }> }, cost: { checkoutChargeAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, buyerIdentity: (
        Pick<StorefrontTypes.CartBuyerIdentity, 'email' | 'phone' | 'countryCode'>
        & { customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>>, deliveryAddressPreferences: Array<Pick<StorefrontTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'provinceCode' | 'countryCodeV2' | 'zip'>>, preferences?: StorefrontTypes.Maybe<{ delivery?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CartDeliveryPreference, 'deliveryMethod'>> }> }
      ) }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerAccessTokenCreateMutationVariables = StorefrontTypes.Exact<{
  email: StorefrontTypes.Scalars['String']['input'];
  password: StorefrontTypes.Scalars['String']['input'];
}>;


export type CustomerAccessTokenCreateMutation = { customerAccessTokenCreate?: StorefrontTypes.Maybe<{ customerAccessToken?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CustomerAccessToken, 'accessToken' | 'expiresAt'>>, customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerAccessTokenDeleteMutationVariables = StorefrontTypes.Exact<{
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
}>;


export type CustomerAccessTokenDeleteMutation = { customerAccessTokenDelete?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.CustomerAccessTokenDeletePayload, 'deletedAccessToken' | 'deletedCustomerAccessTokenId'>
    & { userErrors: Array<Pick<StorefrontTypes.UserError, 'field' | 'message'>> }
  )> };

export type CustomerAddressCreateMutationVariables = StorefrontTypes.Exact<{
  address: StorefrontTypes.MailingAddressInput;
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
}>;


export type CustomerAddressCreateMutation = { customerAddressCreate?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerAddressDeleteMutationVariables = StorefrontTypes.Exact<{
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type CustomerAddressDeleteMutation = { customerAddressDelete?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerAddressUpdateMutationVariables = StorefrontTypes.Exact<{
  address: StorefrontTypes.MailingAddressInput;
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type CustomerAddressUpdateMutation = { customerAddressUpdate?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerCreateMutationVariables = StorefrontTypes.Exact<{
  email: StorefrontTypes.Scalars['String']['input'];
  password: StorefrontTypes.Scalars['String']['input'];
  firstName?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
  lastName?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type CustomerCreateMutation = { customerCreate?: StorefrontTypes.Maybe<{ customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>>, customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerRecoverMutationVariables = StorefrontTypes.Exact<{
  email: StorefrontTypes.Scalars['String']['input'];
}>;


export type CustomerRecoverMutation = { customerRecover?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerResetByUrlMutationVariables = StorefrontTypes.Exact<{
  resetUrl: StorefrontTypes.Scalars['URL']['input'];
  password: StorefrontTypes.Scalars['String']['input'];
}>;


export type CustomerResetByUrlMutation = { customerResetByUrl?: StorefrontTypes.Maybe<{ customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'code' | 'field' | 'message'>> }> };

export type CustomerUpdateMutationVariables = StorefrontTypes.Exact<{
  customer: StorefrontTypes.CustomerUpdateInput;
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
}>;


export type CustomerUpdateMutation = { customerUpdate?: StorefrontTypes.Maybe<{ customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'firstName' | 'email' | 'displayName' | 'createdAt' | 'acceptsMarketing' | 'lastName' | 'id' | 'updatedAt' | 'phone'>>, customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'message' | 'field' | 'code'>> }> };

export type CustomerUpdatePasswordMutationVariables = StorefrontTypes.Exact<{
  password: StorefrontTypes.Scalars['String']['input'];
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
}>;


export type CustomerUpdatePasswordMutation = { customerUpdate?: StorefrontTypes.Maybe<{ customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id' | 'updatedAt'>>, customerUserErrors: Array<Pick<StorefrontTypes.CustomerUserError, 'message' | 'field' | 'code'>> }> };

export type GetCartQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetCartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'createdAt' | 'updatedAt' | 'checkoutUrl'>
    & { lines: { edges: Array<{ node: (
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { product: (
              Pick<StorefrontTypes.Product, 'title' | 'description'>
              & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
            ) }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { product: (
              Pick<StorefrontTypes.Product, 'title' | 'description'>
              & { priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
            ) }
          ) }
        ) }> }, cost: { checkoutChargeAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, buyerIdentity: (
      Pick<StorefrontTypes.CartBuyerIdentity, 'email' | 'phone' | 'countryCode'>
      & { customer?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Customer, 'id'>>, deliveryAddressPreferences: Array<Pick<StorefrontTypes.MailingAddress, 'address1' | 'address2' | 'city' | 'provinceCode' | 'countryCodeV2' | 'zip'>>, preferences?: StorefrontTypes.Maybe<{ delivery?: StorefrontTypes.Maybe<Pick<StorefrontTypes.CartDeliveryPreference, 'deliveryMethod'>> }> }
    ) }
  )> };

export type GetCartLineQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetCartLineQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id'>
    & { lines: { edges: Array<{ node: (
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
        ) }> } }
  )> };

export type GetCustomerQueryVariables = StorefrontTypes.Exact<{
  customerAccessToken: StorefrontTypes.Scalars['String']['input'];
}>;


export type GetCustomerQuery = { customer?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Customer, 'id' | 'createdAt' | 'displayName' | 'email' | 'firstName' | 'lastName' | 'updatedAt' | 'phone'>
    & { addresses: { edges: Array<{ node: Pick<StorefrontTypes.MailingAddress, 'id' | 'address1' | 'firstName' | 'lastName' | 'name' | 'phone' | 'province' | 'zip' | 'city' | 'country'> }> } }
  )> };

export type GetProductsQueryVariables = StorefrontTypes.Exact<{
  first: StorefrontTypes.Scalars['Int']['input'];
}>;


export type GetProductsQuery = { products: { nodes: Array<(
      Pick<StorefrontTypes.Product, 'id' | 'createdAt' | 'description' | 'isGiftCard' | 'productType' | 'publishedAt' | 'tags' | 'title' | 'vendor' | 'updatedAt'>
      & { variants: { edges: Array<{ node: Pick<StorefrontTypes.ProductVariant, 'id'> }> }, priceRange: { maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'width' | 'id' | 'height' | 'altText' | 'url'>>, pageInfo: Pick<StorefrontTypes.PageInfo, 'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'> } }
    )>, pageInfo: Pick<StorefrontTypes.PageInfo, 'startCursor' | 'hasPreviousPage' | 'hasNextPage' | 'endCursor'> } };

interface GeneratedQueryTypes {
  "\n\tquery GetCart($id: ID!) {\n\t\tcart(id: $id) {\n\t\t\t...CartFragment\n\t\t}\n\t}\n\t#REQUIRED_VAR=CART_FRAGMENT\n": {return: GetCartQuery, variables: GetCartQueryVariables},
  "\n\t#graphql\n\tquery GetCartLine($id: ID!) {\n\t\tcart(id: $id) {\n\t\t\tid\n\t\t\tlines(first: 50) {\n\t\t\t\tedges {\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\tmerchandise {\n\t\t\t\t\t\t\t... on ProductVariant {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": {return: GetCartLineQuery, variables: GetCartLineQueryVariables},
  "\n\t#graphql\n\tquery GetCustomer($customerAccessToken: String!) {\n\t\tcustomer(customerAccessToken: $customerAccessToken) {\n\t\t\tid\n\t\t\tcreatedAt\n\t\t\tdisplayName\n\t\t\temail\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tupdatedAt\n\t\t\tphone\n\t\t\taddresses(first: 20) {\n\t\t\t\tedges {\n\t\t\t\t\tnode {\n\t\t\t\t\t\tid\n\t\t\t\t\t\taddress1\n\t\t\t\t\t\tfirstName\n\t\t\t\t\t\tlastName\n\t\t\t\t\t\tname\n\t\t\t\t\t\tphone\n\t\t\t\t\t\tprovince\n\t\t\t\t\t\tzip\n\t\t\t\t\t\tcity\n\t\t\t\t\t\tcountry\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": {return: GetCustomerQuery, variables: GetCustomerQueryVariables},
  "\n\t#graphql\n\tquery GetProducts($first: Int!) {\n\t\tproducts(first: $first) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tcreatedAt\n\t\t\t\tdescription\n\t\t\t\tisGiftCard\n\t\t\t\tproductType\n\t\t\t\tpublishedAt\n\t\t\t\ttags\n\t\t\t\ttitle\n\t\t\t\tvendor\n\t\t\t\tupdatedAt\n\t\t\t\tvariants(first: 10) {\n\t\t\t\t\tedges {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpriceRange {\n\t\t\t\t\tmaxVariantPrice {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t}\n\t\t\t\t\tminVariantPrice {\n\t\t\t\t\t\tamount\n\t\t\t\t\t\tcurrencyCode\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\timages(first: $first) {\n\t\t\t\t\tnodes {\n\t\t\t\t\t\twidth\n\t\t\t\t\t\tid\n\t\t\t\t\t\theight\n\t\t\t\t\t\taltText\n\t\t\t\t\t\turl\n\t\t\t\t\t}\n\t\t\t\t\tpageInfo {\n\t\t\t\t\t\tendCursor\n\t\t\t\t\t\thasNextPage\n\t\t\t\t\t\thasPreviousPage\n\t\t\t\t\t\tstartCursor\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tpageInfo {\n\t\t\t\tstartCursor\n\t\t\t\thasPreviousPage\n\t\t\t\thasNextPage\n\t\t\t\tendCursor\n\t\t\t}\n\t\t}\n\t}\n": {return: GetProductsQuery, variables: GetProductsQueryVariables},
}

interface GeneratedMutationTypes {
  "\n\t#graphql\n\tmutation CartCreate($input: CartInput!) {\n\t\tcartCreate(input: $input) {\n\t\t\tcart {\n\t\t\t\t...CartFragment\n\t\t\t}\n\t\t\tuserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n\t#REQUIRED_VAR=CART_FRAGMENT\n": {return: CartCreateMutation, variables: CartCreateMutationVariables},
  "\n\t#graphql\n\tmutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n\t\tcartLinesUpdate(cartId: $cartId, lines: $lines) {\n\t\t\tcart {\n\t\t\t\t...CartFragment\n\t\t\t}\n\t\t\tuserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n\t#REQUIRED_VAR=CART_FRAGMENT\n": {return: CartLinesUpdateMutation, variables: CartLinesUpdateMutationVariables},
  "\n\t#graphql\n\tmutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n\t\tcartLinesAdd(cartId: $cartId, lines: $lines) {\n\t\t\tcart {\n\t\t\t\t...CartFragment\n\t\t\t}\n\t\t\tuserErrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n\t#REQUIRED_VAR=CART_FRAGMENT\n": {return: CartLinesAddMutation, variables: CartLinesAddMutationVariables},
  "\n\tmutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n\t\tcartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n\t\t\tcart {\n\t\t\t\t...CartFragment\n\t\t\t}\n\t\t\tuserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n\t#REQUIRED_VAR=CART_FRAGMENT\n": {return: CartLinesRemoveMutation, variables: CartLinesRemoveMutationVariables},
  "\n\t#graphql\n\tmutation CustomerAccessTokenCreate($email: String!, $password: String!) {\n\t\tcustomerAccessTokenCreate(input: { email: $email, password: $password }) {\n\t\t\tcustomerAccessToken {\n\t\t\t\taccessToken\n\t\t\t\texpiresAt\n\t\t\t}\n\t\t\tcustomerUserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerAccessTokenCreateMutation, variables: CustomerAccessTokenCreateMutationVariables},
  "\n\t#graphql\n\tmutation CustomerAccessTokenDelete($customerAccessToken: String!) {\n\t\tcustomerAccessTokenDelete(customerAccessToken: $customerAccessToken) {\n\t\t\tdeletedAccessToken\n\t\t\tdeletedCustomerAccessTokenId\n\t\t\tuserErrors {\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerAccessTokenDeleteMutation, variables: CustomerAccessTokenDeleteMutationVariables},
  "\n\t#graphql\n\tmutation CustomerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {\n\t\tcustomerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {\n\t\t\tcustomerUserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerAddressCreateMutation, variables: CustomerAddressCreateMutationVariables},
  "\n\t#graphql\n\tmutation CustomerAddressDelete($customerAccessToken: String!, $id: ID!) {\n\t\tcustomerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {\n\t\t\tcustomerUserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerAddressDeleteMutation, variables: CustomerAddressDeleteMutationVariables},
  "\n\t#graphql\n\tmutation CustomerAddressUpdate(\n\t\t$address: MailingAddressInput!\n\t\t$customerAccessToken: String!\n\t\t$id: ID!\n\t) {\n\t\tcustomerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {\n\t\t\tcustomerUserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerAddressUpdateMutation, variables: CustomerAddressUpdateMutationVariables},
  "\n\t#graphql\n\tmutation CustomerCreate(\n\t\t$email: String!\n\t\t$password: String!\n\t\t$firstName: String\n\t\t$lastName: String\n\t) {\n\t\tcustomerCreate(\n\t\t\tinput: { email: $email, password: $password, firstName: $firstName, lastName: $lastName }\n\t\t) {\n\t\t\tcustomer {\n\t\t\t\tid\n\t\t\t}\n\t\t\tcustomerUserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerCreateMutation, variables: CustomerCreateMutationVariables},
  "\n\t#graphql\n\tmutation CustomerRecover($email: String!) {\n\t\tcustomerRecover(email: $email) {\n\t\t\tcustomerUserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerRecoverMutation, variables: CustomerRecoverMutationVariables},
  "\n\t#graphql\n\tmutation CustomerResetByUrl($resetUrl: URL!, $password: String!) {\n\t\tcustomerResetByUrl(password: $password, resetUrl: $resetUrl) {\n\t\t\tcustomerUserErrors {\n\t\t\t\tcode\n\t\t\t\tfield\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerResetByUrlMutation, variables: CustomerResetByUrlMutationVariables},
  "\n\t#graphql\n\tmutation CustomerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {\n\t\tcustomerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {\n\t\t\tcustomer {\n\t\t\t\tfirstName\n\t\t\t\temail\n\t\t\t\tdisplayName\n\t\t\t\tcreatedAt\n\t\t\t\tacceptsMarketing\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t\tupdatedAt\n\t\t\t\tphone\n\t\t\t}\n\t\t\tcustomerUserErrors {\n\t\t\t\tmessage\n\t\t\t\tfield\n\t\t\t\tcode\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerUpdateMutation, variables: CustomerUpdateMutationVariables},
  "\n\t#graphql\n\tmutation CustomerUpdatePassword($password: String!, $customerAccessToken: String!) {\n\t\tcustomerUpdate(customer: { password: $password }, customerAccessToken: $customerAccessToken) {\n\t\t\tcustomer {\n\t\t\t\tid\n\t\t\t\tupdatedAt\n\t\t\t}\n\t\t\tcustomerUserErrors {\n\t\t\t\tmessage\n\t\t\t\tfield\n\t\t\t\tcode\n\t\t\t}\n\t\t}\n\t}\n": {return: CustomerUpdatePasswordMutation, variables: CustomerUpdatePasswordMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
