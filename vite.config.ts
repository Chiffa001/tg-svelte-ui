import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), svelte(), tsconfigPaths()],
	build: {
		cssCodeSplit: true,
		lib: {
			formats: ['es'],
			entry: 'src/index.ts',
			name: 'SvelteUI',
			fileName: 'index'
		},
		rollupOptions: {
			external: ['svelte', 'svelte/internal'],
		}
	},
	resolve: {
		alias: { '@': path.resolve(__dirname, 'src/lib') }
	}
});
