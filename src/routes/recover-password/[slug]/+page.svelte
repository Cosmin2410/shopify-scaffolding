<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import PasswordInput from '$lib/components/ui/password-input/password-input.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const resetToken = $page.url.searchParams.get('token');

	const { enhance, delayed, errors } = superForm(data.form, {
		multipleSubmits: 'prevent',
		resetForm: false,

		onUpdate: ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.errorMessage || 'Reset password failed', {
					description: 'An error has occured!'
				});
			}
		}
	});
</script>

<div class="mx-5 mt-7 flex items-center justify-center">
	<Card.Root class="mt-10 w-[600px] max-w-full p-8">
		<Card.Title class="mb-2">Password Update</Card.Title>
		<Card.Description class="mb-6">
			You will be logged out after changing the password!
		</Card.Description>

		<form method="POST" action={`?/resetPassword&token=${resetToken}`} use:enhance>
			<div class="mb-4">
				<Label for="password">New Password</Label>
				<p class="text-xs text-muted-foreground">One Uppercase, One Lowercase, And One Number</p>

				<PasswordInput name="password" class="mt-1" />

				<Label for="password" class="label text-red-500">
					{#if $errors.password}
						<span class="label-text-alt text-error">{$errors.password?.[0]}</span>
					{/if}
				</Label>
			</div>

			<div class="mb-4">
				<Label for="repeatPassword">Repeat New Password</Label>
				<PasswordInput name="repeatPassword" class="mt-1" />

				<Label for="repeatPassword" class="label text-red-500">
					{#if $errors.repeatPassword}
						<span class="label-text-alt text-error">{$errors.repeatPassword?.[0]}</span>
					{/if}
				</Label>
			</div>

			<Button type="submit">
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}

				Update Password
			</Button>
		</form>
	</Card.Root>
</div>
