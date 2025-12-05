<script lang="ts">
	import logo from '@/assets/img/still-waters-logo.webp';
	import { Modal } from '../modal';
	import { LoaderBar } from '../loader-bar';
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
