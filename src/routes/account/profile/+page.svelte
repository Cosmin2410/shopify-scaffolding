<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';
	import PasswordInput from '$lib/components/ui/password-input/password-input.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const {
		form: profileForm,
		enhance: profileEnhance,
		delayed: profileDelayed,
		errors: profileErrors
	} = superForm(data.updateProfileForm, {
		multipleSubmits: 'prevent',
		resetForm: false,

		onUpdate: ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.errorMessage, {
					description: 'An error has occured!'
				});
			} else if (result.type === 'success') {
				toast.success('Profile updated!');
			}
		}
	});

	const {
		form: passwordForm,
		enhance: passwordEnhance,
		delayed: passwordDelayed,
		errors: passwordErrors
	} = superForm(data.updatePasswordForm, {
		multipleSubmits: 'prevent',
		resetForm: false,

		onUpdate: ({ result }) => {
			if (result.type === 'failure') {
				toast.error(result.data?.errorMessage, {
					description: 'An error has occured!'
				});
			}
		},

		onError: ({ result }) => {
			toast.error(result.error?.message || 'An unexpected error occurred');
		}
	});
</script>

<Card.Root class="p-5">
	<Card.Title class="mb-6">Profile Update</Card.Title>

	<form method="POST" action="?/profile" use:profileEnhance>
		<div class="mb-4">
			<div class="mb-4">
				<Label for="firstName">First Name</Label>
				<Input type="text" name="firstName" class="mt-1" value={$profileForm.firstName} />

				<Label for="firstName" class="label text-red-500">
					{#if $profileErrors.firstName}
						<span class="label-text-alt text-error">{$profileErrors.firstName?.[0]}</span>
					{/if}
				</Label>
			</div>

			<div class="mb-4">
				<Label for="lastName">Last Name</Label>
				<Input type="text" name="lastName" class="mt-1" value={$profileForm.lastName} />

				<Label for="lastName" class="label text-red-500">
					{#if $profileErrors.lastName}
						<span class="label-text-alt text-error">{$profileErrors.lastName?.[0]}</span>
					{/if}
				</Label>
			</div>

			<div class="mb-4">
				<Label for="email">Email</Label>
				<Input type="email" name="email" class="mt-1" value={$profileForm.email} />

				<Label for="email" class="label text-red-500">
					{#if $profileErrors.email}
						<span class="label-text-alt text-error">{$profileErrors.email?.[0]}</span>
					{/if}
				</Label>
			</div>

			<div class="mb-4">
				<Label for="phone">Phone (add prefix), Ex: +40764098765</Label>
				<Input type="phone" name="phone" class="mt-1" value={$profileForm.phone} />
			</div>
		</div>

		<Button type="submit">
			{#if $profileDelayed}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{/if}

			Update Profile
		</Button>
	</form>
</Card.Root>

<Card.Root class="mt-10 p-5">
	<Card.Title class="mb-2">Password Update</Card.Title>
	<Card.Description class="mb-6">
		You will be logged out after changing the password!
	</Card.Description>

	<form method="POST" action="?/passwordUpdate" use:passwordEnhance>
		<div class="mb-4">
			<Label for="password">New Password</Label>
			<p class="text-xs text-muted-foreground">One Uppercase, One Lowercase, And One Number</p>

			<PasswordInput name="password" class="mt-1" value={$passwordForm.password} />

			<Label for="password" class="label text-red-500">
				{#if $passwordErrors.password}
					<span class="label-text-alt text-error">{$passwordErrors.password?.[0]}</span>
				{/if}
			</Label>
		</div>

		<div class="mb-4">
			<Label for="repeatPassword">Repeat New Password</Label>
			<PasswordInput name="repeatPassword" class="mt-1" value={$passwordForm.repeatPassword} />

			<Label for="repeatPassword" class="label text-red-500">
				{#if $passwordErrors.repeatPassword}
					<span class="label-text-alt text-error">{$passwordErrors.repeatPassword?.[0]}</span>
				{/if}
			</Label>
		</div>

		<Button type="submit">
			{#if $passwordDelayed}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{/if}

			Update Password
		</Button>
	</form>
</Card.Root>
