<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const {
		form: formData,
		errors,
		enhance,
		delayed
	} = superForm(data.form, {
		multipleSubmits: 'prevent',
		
		onUpdate: ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.errorMessage || 'Recover email failed', {
					description: 'An error has occured!'
				});
			} else if (result.type === 'success') {
				toast.success('Email sent!');
			}
		},

		onError: ({ result }) => {
			toast.error(result.error?.message || 'An unexpected error occurred');
		}
	});
</script>

<!-- !! You will receive an email in your inbox, you need to configure shopify's email template  -->
<!-- !! To something like this: <a href="http://localhost:5173/recover-password/recover?token={{ customer.reset_password_url }}" class="button__text">Reset your password</a> -->

<div class="mx-5 mt-7 flex items-center justify-center">
	<Card.Root class="w-[600px] max-w-full p-8">
		<Card.Title class="mb-3">Get your account back</Card.Title>
		<Card.Description class="mb-4">
			Already have an account?
			<Button variant="link" href="/login">Login</Button>
		</Card.Description>

		<form method="POST" action="?/recoverPassword" use:enhance>
			<div class="mb-4">
				<Label for="email">Email</Label>
				<Input type="email" name="email" class="input mt-1 " value={$formData.email} />

				<Label for="email" class="label text-red-500">
					{#if $errors.email}
						<span class="label-text-alt text-error">{$errors.email?.[0]}</span>
					{/if}
				</Label>
			</div>

			<Button class="my-4 w-full" type="submit">
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Send recovery email
			</Button>
		</form>
	</Card.Root>
</div>
