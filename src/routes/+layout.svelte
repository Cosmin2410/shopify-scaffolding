<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { cart } from '$lib/store/cart';
	import Cart from '@/components/cart/cart.svelte';
	import Logo from '$lib/assets/Logo.svelte';

	import '../app.css';

	let { children, data } = $props();

	$effect(() => {
		if (data.cart?.id) {
			cart.setCart(data.cart);
		}
	});

	let logoColor = $derived(`${$mode === 'dark' ? '#ffff' : '#000000'}`);
</script>

<ModeWatcher defaultMode={'dark'} />
<Toaster position="top-center" duration={5000} richColors closeButton expand />

<header class="mb-2 shadow">
	<div class="relative mx-auto flex max-w-screen-xl flex-row items-center px-4 py-4">
		<a href="/" class="none sm:w-52">
			<Logo color={logoColor} />
		</a>

		<nav
			aria-label="Header Navigation"
			class="flex w-full flex-col items-center justify-between transition-all"
		>
			<ul class="flex flex-row items-center gap-4 sm:ml-auto sm:gap-7">
				<li class="text-muted-foreground hover:text-ring">
					<a href="/products">Products</a>
				</li>

				{#if !$page.data.user}
					<li class="text-muted-foreground hover:text-ring">
						<a href="/register">Register</a>
					</li>

					<li class="text-muted-foreground hover:text-ring">
						<Button variant="outline" href="/login">Login</Button>
					</li>
				{:else}
					<li class="text-muted-foreground hover:text-ring">
						<a href="/account/profile">Account</a>
					</li>

					<li class="text-muted-foreground hover:text-ring">
						<form action="/logout?/logout" method="POST">
							<Button type="submit" variant="outline">Logout</Button>
						</form>
					</li>
				{/if}

				<Cart />
			</ul>
		</nav>
	</div>
</header>

<main>
	{@render children?.()}
</main>
