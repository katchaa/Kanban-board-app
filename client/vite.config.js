import { fileURLToPath, URL } from 'node:url'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
        @import "./src/assets/scss/variables.scss";
		@import "./src/assets/scss/transitions.scss";
        `,
			},
		},
	},
})
