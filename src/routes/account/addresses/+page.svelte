<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import { enhance as enhanceDelete } from '$app/forms';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import type { MailingAddress } from '@/graphql/generated/storefront.types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let dialog = $state(false);
	let selectedAddressId: string = $state('');

	function editAddress(address: MailingAddress) {
		dialog = true;
		selectedAddressId = address?.id;

		$formData.address = address?.address1 || '';
		$formData.firstName = address?.firstName || '';
		$formData.lastName = address?.lastName || '';
		$formData.phone = address?.phone || '';
		$formData.province = address?.province || '';
		$formData.zip = address?.zip || '';
		$formData.city = address?.city || '';
		$formData.country = address?.country || '';
	}

	const {
		form: formData,
		errors,
		enhance,
		delayed,
		reset
	} = superForm(data.form, {
		multipleSubmits: 'prevent',

		onResult: ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result?.data?.errorMessage, {
					description: 'An error has occured!'
				});
			} else if (result.type === 'success') {
				toast.success(selectedAddressId ? 'Address updated!' : 'New address created!');
				dialog = false;
			}
		}
	});
</script>

<Dialog.Root
	bind:open={dialog}
	onOpenChange={() => {
		reset();
		selectedAddressId = '';
	}}
>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]}>Add New Address</Button>
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{#if !!selectedAddressId}
					Edit address
				{:else}
					Add new address
				{/if}
			</Dialog.Title>
		</Dialog.Header>

		<form method="POST" action={`?/upsertAddress&id=${selectedAddressId}`} use:enhance>
			<div class="mb-4">
				<div class="mb-4 flex gap-3">
					<div class="flex-1">
						<Label for="country">Country</Label>
						<Input type="text" name="country" class="input mt-1 " value={$formData.country} />
						<Label for="country" class="label text-red-500">
							{#if $errors.country}
								<span class="label-text-alt text-error">{$errors.country?.[0]}</span>
							{/if}
						</Label>
					</div>

					<div class="flex-1">
						<Label for="province">Province</Label>
						<Input type="text" name="province" class="input mt-1 " value={$formData.province} />
						<Label for="province" class="label text-red-500">
							{#if $errors.province}
								<span class="label-text-alt text-error">{$errors.province?.[0]}</span>
							{/if}
						</Label>
					</div>
				</div>

				<div class="mb-4">
					<Label for="address">Address</Label>
					<Input type="text" name="address" class="input mt-1 " value={$formData.address} />
					<Label for="address" class="label text-red-500">
						{#if $errors.address}
							<span class="label-text-alt text-error">{$errors.address?.[0]}</span>
						{/if}
					</Label>
				</div>

				<div class="mb-4 flex gap-3">
					<div class="flex-1">
						<Label for="city">City</Label>
						<Input type="text" name="city" class="input mt-1 " value={$formData.city} />
						<Label for="city" class="label text-red-500">
							{#if $errors.city}
								<span class="label-text-alt text-error">{$errors.city?.[0]}</span>
							{/if}
						</Label>
					</div>

					<div class="flex-1">
						<Label for="zip">Zip Code</Label>
						<Input type="text" name="zip" class="input mt-1 " value={$formData.zip} />
						<Label for="zip" class="label text-red-500">
							{#if $errors.zip}
								<span class="label-text-alt text-error">{$errors.zip?.[0]}</span>
							{/if}
						</Label>
					</div>
				</div>

				<div class="mb-4 flex gap-3">
					<div class="flex-1">
						<Label for="firstName">First Name</Label>
						<Input type="text" name="firstName" class="input mt-1 " value={$formData.firstName} />
						<Label for="firstName" class="label text-red-500">
							{#if $errors.firstName}
								<span class="label-text-alt text-error">{$errors.firstName?.[0]}</span>
							{/if}
						</Label>
					</div>

					<div class="flex-1">
						<Label for="lastName">Last Name</Label>
						<Input type="text" name="lastName" class="input mt-1 " value={$formData.lastName} />
						<Label for="lastName" class="label text-red-500">
							{#if $errors.lastName}
								<span class="label-text-alt text-error">{$errors.lastName?.[0]}</span>
							{/if}
						</Label>
					</div>
				</div>

				<div class="mb-4">
					<Label for="phone">Phone</Label>
					<Input type="text" name="phone" class="input mt-1 " value={$formData.phone} />
					<Label for="phone" class="label text-red-500">
						{#if $errors.phone}
							<span class="label-text-alt text-error">{$errors.phone?.[0]}</span>
						{/if}
					</Label>
				</div>
			</div>

			<Dialog.Footer>
				<Button variant="outline" onclick={() => (dialog = false)}>Cancel</Button>
				<Button type="submit">
					{#if $delayed}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
					{/if}

					Save
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

{#each data.user?.addresses?.edges || [] as address, index}
	<Card.Root class="mt-5 p-5">
		<Card.Title class="mb-6">Address {index + 1}</Card.Title>

		<p class="mb-2 text-muted-foreground">
			Address: <span class="text-accent-foreground"> {address?.node?.address1} </span>
		</p>

		<p class="mb-2 text-muted-foreground">
			First Name: <span class="text-accent-foreground"> {address?.node?.firstName} </span>
		</p>

		<p class="mb-2 text-muted-foreground">
			Last Name: <span class="text-accent-foreground"> {address?.node?.lastName} </span>
		</p>

		<p class="mb-2 text-muted-foreground">
			Country: <span class="text-accent-foreground"> {address?.node?.country} </span>
		</p>

		<p class="mb-2 text-muted-foreground">
			Province: <span class="text-accent-foreground"> {address?.node?.province} </span>
		</p>

		<p class="mb-2 text-muted-foreground">
			City: <span class="text-accent-foreground"> {address?.node?.city} </span>
		</p>

		<p class="mb-2 text-muted-foreground">
			Zip: <span class="text-accent-foreground"> {address?.node?.zip} </span>
		</p>

		<p class="mb-2 text-muted-foreground">
			Phone: <span class="text-accent-foreground"> {address?.node?.phone} </span>
		</p>

		<Card.Footer class="mt-5 p-0">
			<Button class="mr-5" onclick={() => editAddress(address?.node)}>Edit Address</Button>

			<form action={`?/deleteAddress&id=${address?.node?.id}`} method="POST" use:enhanceDelete>
				<Button variant="destructive" type="submit">Delete Address</Button>
			</form>
		</Card.Footer>
	</Card.Root>
{/each}
