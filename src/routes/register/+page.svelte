<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import PasswordInput from '@/components/ui/password-input/password-input.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import type { PageData, ActionData } from './$types';

	let { data }: { data: PageData; form: ActionData } = $props();

	const {
		form: formData,
		errors,
		enhance,
		delayed
	} = superForm(data.form, {
		multipleSubmits: 'prevent',
		onUpdate: ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.errorMessage || 'Register failed', {
					description: 'An error has occured!'
				});
			}
		},

		onError: ({ result }) => {
			toast.error(result.error?.message || 'An unexpected error occurred');
		}
	});
</script>

<div class="mx-5 mt-7 flex items-center justify-center">
	<Card.Root class="w-[600px] max-w-full p-8">
		<Card.Title class="mb-3">Register</Card.Title>
		<Card.Description class="mb-4">
			Already have an account?
			<Button variant="link" href="/login">Login</Button>
		</Card.Description>

		<form method="POST" action="?/register" use:enhance>
			<div class="mb-4">
				<div class="mb-4">
					<Label for="firstName">First Name</Label>
					<Input type="text" name="firstName" class="input mt-1 " value={$formData.firstName} />
				</div>

				<div class="mb-4">
					<Label for="lastName">Last Name</Label>
					<Input type="text" name="lastName" class="input mt-1 " value={$formData.lastName} />
				</div>

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
				<p class="text-xs text-muted-foreground">One Uppercase, One Lowercase, And One Number</p>

				<PasswordInput name="password" class="mt-1" value={$formData.password} />

				<Label for="password" class="label text-red-500">
					{#if $errors.password}
						<span class="label-text-alt text-error">{$errors.password?.[0]}</span>
					{/if}
				</Label>
			</div>

			<div class="mb-4">
				<Label for="repeatPassword">Repeat Password</Label>
				<PasswordInput name="repeatPassword" class="mt-1" value={$formData.repeatPassword} />

				<Label for="repeatPassword" class="label text-red-500">
					{#if $errors.repeatPassword}
						<span class="label-text-alt text-error">{$errors.repeatPassword?.[0]}</span>
					{/if}
				</Label>
			</div>

			<Button class="my-4 w-full" type="submit">
				{#if $delayed}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Register
			</Button>
		</form>
	</Card.Root>
</div>
