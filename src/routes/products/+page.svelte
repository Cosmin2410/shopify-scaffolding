<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { cart } from '$lib/store/cart';
	import { ShoppingCart } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	import type { CartResponse } from '@/types/cart';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let loading = $state(false);
	let productId = $state('');

	async function addToCart(merchandiseId: string, quantity: number = 1) {
		try {
			loading = true;
			productId = merchandiseId;

			const response = await fetch(
				`/api/handleCart?merchandiseId=${merchandiseId}&quantity=${quantity}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' }
				}
			);
			const result: CartResponse = await response.json();

			if (response.ok && result?.cart) {
				cart.updateCart(() => result?.cart);
			} else {
				console.error('Error updating cart:', result.error);
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			loading = false;
		}
	}
</script>

<div class="responsive-grid mx-10 mt-24">
	{#each data?.response?.products?.nodes || [] as product}
		<Card.Root class="shadow-md">
			<div class="flex items-center justify-center">
				<img
					class="w-[448px] max-w-full object-cover"
					src={product?.images?.nodes?.[0]?.url || ''}
					alt={'product image'}
				/>
			</div>

			<div class="mt-4 px-5 pb-5">
				<Card.Title class="text-xl tracking-tight">{product?.title}</Card.Title>

				<Card.Description class="mb-5 mt-2 flex items-center justify-between">
					{product?.priceRange.maxVariantPrice.amount}
					{product?.priceRange.maxVariantPrice.currencyCode}
				</Card.Description>

				<Button
					variant="secondary"
					class="flex w-full items-center justify-center gap-2"
					onclick={() => {
						if (loading && productId === product?.variants?.edges?.[0]?.node?.id) {
							return;
						}

						return addToCart(product?.variants?.edges?.[0]?.node?.id);
					}}
				>
					{#if loading && productId === product?.variants?.edges?.[0]?.node?.id}
						<LoaderCircle class="mr-2 h-6 w-6 animate-spin" />
					{:else}
						<ShoppingCart />
						Add to cart
					{/if}
				</Button>
			</div>
		</Card.Root>
	{/each}
</div>
