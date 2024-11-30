import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
	darkMode: 'media',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [typography, daisyui]
} as Config
