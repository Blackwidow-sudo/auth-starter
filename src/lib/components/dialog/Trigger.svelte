<script lang="ts">
	import { cn } from '$lib/utils'

	interface Props {
		class?: HTMLButtonElement['className']
		onclick?: (e: MouseEvent) => void
	}

	let { class: cls = '', onclick }: Props = $props()
</script>

<button
	class={cn('rounded p-2 transition-colors hover:bg-black/20', cls)}
	type="button"
	{onclick}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round">
		<line
			x1="4"
			x2="20"
			y1="12"
			y2="12" />
		<line
			x1="4"
			x2="20"
			y1="6"
			y2="6" />
		<line
			x1="4"
			x2="20"
			y1="18"
			y2="18" />
	</svg>
	<span class="sr-only">Open navigation</span>
</button>
