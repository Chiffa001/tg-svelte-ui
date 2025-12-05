<script lang="ts">
	import { onMount, type Snippet, type Component } from 'svelte';

	type Tab = {
		id: string;
		icon?: Component | Snippet<[]>;
		text?: string;
	};

	type Props = {
		className?: string;
		activeId?: Tab['id'];
		tabs: Tab[];
		setActiveItemId?: (id: Tab['id']) => void;
	};

	const { className = '', tabs, activeId = tabs[0].id, setActiveItemId }: Props = $props();

	let active = $state(activeId);
	let indicatorLeft = $state(0);
	let indicatorWidth = $state(0);
	let isResizing = $state(false);
	let isAnimationActive = $state(false);

	let containerEl: HTMLElement | null = $state(null);
	let itemEls = $state<Record<Tab['id'], HTMLElement>>({});

	function updateIndicator() {
		const el = itemEls[active];
		if (!el || !containerEl) return;

		const cRect = containerEl.getBoundingClientRect();
		const rect = el.getBoundingClientRect();

		const style = getComputedStyle(containerEl);
		const paddingLeft = parseFloat(style.paddingLeft);

		indicatorLeft = rect.left - cRect.left - paddingLeft;
		indicatorWidth = rect.width;
	}

	function activate(id: Tab['id']) {
		if (id === active) return;
		active = id;
		setActiveItemId?.(id);
		updateIndicator();
	}

	onMount(() => {
		updateIndicator();

		setTimeout(() => {
			isAnimationActive = true;
		}, 300);

		let resizeTimeout: number;
		const ro = new ResizeObserver(() => {
			// временно отключаем анимацию
			isResizing = true;
			updateIndicator();

			clearTimeout(resizeTimeout);
			resizeTimeout = window.setTimeout(() => (isResizing = false), 150);
		});

		ro.observe(containerEl as HTMLElement);
		Object.values(itemEls).forEach((el) => ro.observe(el));

		return () => ro.disconnect();
	});
</script>

<div
	class="relative mx-auto flex w-full max-w-2xl justify-between rounded-lg bg-[#232331] px-2 py-1 shadow-md {className}"
	bind:this={containerEl}
>
	{#each tabs as tab (tab.id)}
		{@const isActive = tab.id === active}
		{@const Icon = tab.icon}
		<button
			class="relative z-10 flex-1 cursor-pointer rounded-xl py-2 text-sm font-medium transition-colors duration-200 focus:outline-none"
			onclick={() => activate(tab.id)}
			bind:this={itemEls[tab.id]}
		>
			<div
				class="flex flex-col items-center justify-center gap-0.5 text-[#A6A6A6] hover:text-white"
			>
				{#if Icon}
					<span class:text-[#6C79E6]={isActive}>
						<Icon />
					</span>
				{/if}
				{#if tab.text}
					<span class:text-white={isActive} class="text-[#A6A6A6]">{tab.text}</span>
				{/if}
			</div>
		</button>
	{/each}

	<!-- Индикатор -->
	<div
		class="pointer-events-none absolute top-1 bottom-1 rounded-lg bg-[#30303D] ease-in-out"
		class:transition-all={!isResizing && isAnimationActive}
		class:duration-300={!isResizing && isAnimationActive}
		style="transform: translateX({indicatorLeft}px); width: {indicatorWidth}px;"
	></div>
</div>
