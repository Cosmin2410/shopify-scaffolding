<script lang="ts">
	import { setMode } from 'mode-watcher';
</script>

<p class="text-2xl font-bold tracking-tight">Theme</p>
<p class="mb-4 text-muted-foreground">Select the theme for the website.</p>

<div class="flex gap-6">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class=" flex flex-grow cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted p-1 hover:bg-accent"
		onclick={() => setMode('light')}
	>
		<div class="w-full space-y-2 rounded-sm bg-[#ecedef] p-2">
			<div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
				<div class="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
				<div class="h-2 w-full max-w-[100px] rounded-lg bg-[#ecedef]"></div>
			</div>
			<div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
				<div class="h-[4px] w-[10px] rounded-full bg-[#ecedef] sm:h-2 sm:w-4"></div>
				<div class="h-2 w-full max-w-[100px] rounded-lg bg-[#ecedef]"></div>
			</div>
			<div class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
				<div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
				<div class="h-2 w-full max-w-[100px] rounded-lg bg-[#ecedef]"></div>
			</div>
		</div>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="flex flex-grow flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
		onclick={() => setMode('dark')}
	>
		<div class=" w-full cursor-pointer space-y-2 rounded-sm bg-slate-950 p-2">
			<div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
				<div class="h-2 w-[80px] rounded-lg bg-slate-400"></div>
				<div class="h-2 w-full max-w-[100px] rounded-lg bg-slate-400"></div>
			</div>
			<div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
				<div class="h-4 w-4 rounded-full bg-slate-400"></div>
				<div class="h-2 w-full max-w-[100px] rounded-lg bg-slate-400"></div>
			</div>
			<div class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
				<div class="h-4 w-4 rounded-full bg-slate-400"></div>
				<div class="h-2 w-full max-w-[100px] rounded-lg bg-slate-400"></div>
			</div>
		</div>
	</div>
</div>
