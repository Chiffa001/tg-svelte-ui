<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();
	let isDesktop = $state(false);
	let isMounted = $state(false);

	const updateSize = () => {
		isDesktop = window.innerWidth >= 640;
	};

	onMount(() => {
		updateSize();
		isMounted = true;
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	});
</script>

<main class="flex min-h-screen items-center justify-center overflow-x-hidden">
	{#if isMounted}
		{#if isDesktop}
			<div
				class="relative h-[720px] max-h-[90vh] w-[360px] max-w-[90vw] rounded-3xl border-4 border-gray-500"
				style="transform-origin: top center;"
			>
				<div
					class="absolute flex h-full w-full flex-col items-center overflow-hidden rounded-3xl p-4"
				>
					{@render children?.()}
				</div>
			</div>
		{:else}
			<div class="relative flex h-screen w-full flex-col items-center p-4">
				{@render children?.()}
			</div>
		{/if}
	{/if}
</main>
