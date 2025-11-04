<script lang="ts">
	import { type Snippet } from 'svelte';
	import CrossIcon from './icons/cross-icon.svelte';

	type Props = {
		isOpen: boolean;
		onClose: () => void;
		hasCloser?: boolean;
		fullScreen?: boolean;
		children: Snippet;
	};

	const { isOpen, onClose, hasCloser, fullScreen, children }: Props = $props();

	const sizeStyles = fullScreen
		? 'h-full pb-10'
		: 'bottom-[34px] scale-95 rounded-3xl border-[0.5px] border-[#0D0D17]';
</script>

{#if isOpen}
	<div class="absolute top-0 left-0 flex h-full w-full items-center justify-center">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			onclick={onClose}
			class="absolute inset-0 z-40 h-full w-full bg-black/50 transition-opacity duration-300"
		></div>

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			onclick={(e) => e.stopPropagation()}
			class={`animate-modal-in absolute left-1/2 z-50 flex min-h-[285px]
             w-full -translate-x-1/2 transform items-center justify-center bg-[#232331] p-3 text-white opacity-0
             shadow-xl transition-transform duration-300 ${sizeStyles}`}
		>
			{#if hasCloser}
				<button
					onclick={onClose}
					class="absolute top-3.5 right-3.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-[#FFFFFF1A]"
				>
					<CrossIcon height={10} width={10} fill="white" />
				</button>
			{/if}
			{@render children()}
		</div>
	</div>
{/if}

<style>
	@keyframes modal-in {
		0% {
			opacity: 0;
			transform: scale(0.95);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-modal-in {
		animation: modal-in 0.2s forwards;
	}
</style>
