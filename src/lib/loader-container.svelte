<script lang="ts">
	import Modal from './modal.svelte';
	import logo from './assets/img/still-waters-logo.webp';
	import LoaderBar from './loader-bar.svelte';
</script>

<Modal fullScreen isOpen withoutAnimation>
	<div class="flex w-[85%] flex-col gap-2">
		<div
			class="aspect-2/1 w-full bg-contain bg-no-repeat"
			style="background-image: url('{logo}')"
		></div>
		<LoaderBar />
	</div>
</Modal>
