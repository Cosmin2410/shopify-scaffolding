<script lang="ts">
	import { mode } from 'mode-watcher';
	import { cn } from '@/utils';
</script>

<div class="mx-auto flex h-screen max-w-[1200px] flex-col items-center justify-center text-center">
	<h1 class="title">
		<span class={cn($mode === 'dark' ? 'gradient-dark' : 'gradient-light')}>
			Shopify-Integrated E-commerce Scaffolding with
		</span>
		<br />
		<span class="text-[#ff3e00]"> SvelteKit </span> <span class="ml-5"> 🏗️ </span>
	</h1>

	<p class="text text-muted-foreground">
		This scaffolding is designed to help developers kickstart their e-commerce websites using
		Shopify as a backend and SvelteKit as the frontend framework. It provides pre-built connections
		to Shopify's API, including type safe graphql queries with codegen, configured tailwind with
		dark theme and components from shadcn-svelte 🚀
	</p>
</div>
