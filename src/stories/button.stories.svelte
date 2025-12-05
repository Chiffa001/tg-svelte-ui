<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '@/components/button';
	import { fn } from 'storybook/test';
	import '@/tailwind.css';

	const text = 'Any snippet or text';

	const { Story } = defineMeta({
		title: 'Example/Button',
		component: Button,
		tags: ['autodocs'],
		args: {
			onClick: fn()
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['primary', 'outline']
			},
			className: { control: false },
			children: { control: false },
			onClick: { control: false },
			disabled: { control: 'boolean', defaultValue: false }
		}
	});
</script>

<Story name="Primary">{text}</Story>

<Story name="Outlined" args={{ variant: 'outline' }}>{text}</Story>
