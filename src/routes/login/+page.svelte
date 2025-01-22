<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let message = $state($page.url.searchParams.get('message') ?? '');

	const {
		form: formData,
		errors,
		enhance,
		delayed
	} = superForm(data.form, {
		onUpdate: ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.errorMessage || 'Authentication failed', {
					description: 'An error has occured!'
				});
			}
		},

		onError: ({ result }) => {
			toast.error(result.error?.message || 'An unexpected error occurred');
		}
	});

	$effect(() => {
		if (message) {
			toast.error(message);
		}
	});
</script>

<div class="mx-5 mt-7 flex items-center justify-center">
	<Card.Root class="w-[600px] max-w-full p-8">
		<Card.Title class="mb-3">Welcome!</Card.Title>
		<Card.Description class="mb-4">Please sign-in to access your account</Card.Description>

		<form method="POST" action="?/login" use:enhance>
			<div class="mb-4">
				<Label for="email">Email</Label>
				<Input type="email" name="email" class="input mt-1 " value={$formData.email} />

				<Label for="email" class="label text-red-500">
					{#if $errors.email}
						<span class="label-text-alt text-error">{$errors.email?.[0]}</span>
					{/if}
				</Label>
			</div>

			<div class="mb-4">
				<Label for="password">Password</Label>
				<Input type="password" name="password" class="mt-1" />

				<Label for="password" class="label text-red-500">
					{#if $errors.password}
						<span class="label-text-alt text-error">{$errors.password}</span>
					{/if}
				</Label>
			</div>

			<Button class="my-4 w-full" type="submit">
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Login
			</Button>
		</form>

		<p class="mb-2 text-start text-sm">
			New here?
			<Button variant="link" href="/register" class="text-sm">Create an account</Button>
		</p>

		<p class="mb-4 text-start text-sm">
			Forgot your password?
			<Button variant="link" href="/recover-password">Get your account back</Button>
		</p>
	</Card.Root>
</div>
