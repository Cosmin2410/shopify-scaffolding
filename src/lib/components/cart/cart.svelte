<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Trash } from 'lucide-svelte';
	import { ShoppingCart } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cart } from '$lib/store/cart';

	import type { CartResponse } from '@/types/cart';
	import type { BaseCartLine } from '@/graphql/generated/storefront.types.js';

	let loading = $state(false);
	let productId = $state('');

	async function handleCartLineUpdate(
		quantity: number = 1,
		merchandiseId: string,
		line: BaseCartLine,
		action: 'retract' | 'add' | 'remove-all'
	) {
		try {
			loading = true;
			productId = merchandiseId;

			const response = await fetch('/api/handleCartLineUpdate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					merchandiseId,
					quantity,
					line,
					action
				})
			});

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

<Sheet.Root>
	<Sheet.Trigger>
		<ShoppingCart class="ml-5 cursor-pointer text-muted-foreground hover:text-ring" />
	</Sheet.Trigger>

	<Sheet.Content class="overflow-y-auto">
		<Sheet.Header>
			<Sheet.Title>Cart</Sheet.Title>
		</Sheet.Header>

		<div class="mt-6">
			{#if $cart?.lines?.edges?.length}
				{#each $cart?.lines?.edges as line}
					<div class="mb-4 rounded bg-secondary p-4">
						<Trash
							class="ml-auto h-5 w-5 cursor-pointer text-red-400"
							onclick={() =>
								handleCartLineUpdate(1, line?.node?.merchandise?.id, line?.node, 'remove-all')}
						/>

						<div>
							<p>
								{line?.node?.merchandise?.product?.title}
							</p>

							<p>
								Quantity: {loading && productId === line?.node?.merchandise?.id
									? 'Loading...'
									: line?.node?.quantity}
							</p>
						</div>

						<div class="mt-4 border-t border-secondary-foreground">
							<div class="mt-4 flex items-center justify-between">
								<div>
									<Button
										class="text-lg"
										onclick={() =>
											handleCartLineUpdate(1, line?.node?.merchandise?.id, line?.node, 'retract')}
										disabled={loading && productId === line?.node?.merchandise?.id}
									>
										-
									</Button>
									<Button
										class="text-lg"
										onclick={() =>
											handleCartLineUpdate(1, line?.node?.merchandise?.id, line?.node, 'add')}
										disabled={loading && productId === line?.node?.merchandise?.id}
									>
										+
									</Button>
								</div>

								<p>
									{line?.node?.merchandise?.product?.priceRange?.maxVariantPrice?.amount}
									{line?.node?.merchandise?.product?.priceRange?.maxVariantPrice?.currencyCode}
								</p>
							</div>
						</div>
					</div>
				{/each}

				<div class="flex items-center justify-between">
					<p class="mt-4 font-medium">Total:</p>
					<p class="mt-4 font-bold">
						{$cart?.cost?.checkoutChargeAmount?.amount || 0}
						{$cart?.cost?.checkoutChargeAmount?.currencyCode}
					</p>
				</div>

				<div class="flex items-center justify-center">
					<Button href={$cart?.checkoutUrl} class="mt-6">Proceed to Checkout</Button>
				</div>
			{:else}
				<p class="flex items-center justify-center">No items added</p>
			{/if}
		</div>
	</Sheet.Content>
</Sheet.Root>
