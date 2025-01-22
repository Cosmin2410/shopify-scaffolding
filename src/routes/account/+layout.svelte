<script lang="ts">
	import { cn } from '@/utils';
	import { page } from '$app/stores';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: '/account/profile'
		},
		{
			title: 'Addresses',
			href: '/account/addresses'
		},
		{
			title: 'Appearance',
			href: '/account/appearance'
		}
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<div class="space-y-6 p-10 pb-16 md:block">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
		<p class="text-muted-foreground">Manage your account settings.</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="lg:w-1/5">
			<nav class={'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'}>
				{#each sidebarNavItems as item}
					{@const isActive = $page.url.pathname === item.href}

					<Button
						href={item.href}
						variant="ghost"
						class={cn(
							!isActive && 'hover:underline',
							'relative justify-start hover:bg-transparent'
						)}
						data-sveltekit-noscroll
					>
						{#if isActive}
							<div
								class="absolute inset-0 rounded-md bg-muted"
								in:send={{ key: 'active-sidebar-tab' }}
								out:receive={{ key: 'active-sidebar-tab' }}
							></div>
						{/if}
						<div class="relative">
							{item.title}
						</div>
					</Button>
				{/each}
			</nav>
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			<slot />
		</div>
	</div>
</div>
