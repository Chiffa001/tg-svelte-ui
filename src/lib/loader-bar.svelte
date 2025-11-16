<script lang="ts">
	let {
		width = 'w-54',
		height = 'h-1',
		bgColor = 'bg-gray-200',
		loaderColor = 'bg-blue-500',
		loaderWidth = 'w-20',
		borderRadius = 'rounded',
		show = true,
		duration = '2s'
	} = $props();
</script>

{#if show}
	<div class="flex items-center justify-center">
		<div class="relative overflow-hidden {bgColor} {height} {width} {borderRadius}">
			<div
				class="absolute top-0 {height} {loaderWidth} {borderRadius} {loaderColor} animate-move-linear"
				style="animation-duration: {duration}"
			></div>
		</div>
	</div>
{/if}

<style>
	.animate-move-linear {
		animation: moveLinear linear infinite;
	}

	@keyframes moveLinear {
		0% {
			left: -100%;
			transform: translateX(0);
		}
		100% {
			left: 100%;
			transform: translateX(100%);
		}
	}
</style>
