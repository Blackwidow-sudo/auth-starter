<script lang="ts">
	import { portal } from './actions.svelte'

	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
		target?: string
	}

	let { children, target = 'body' }: Props = $props()
</script>

<div
	hidden
	use:portal={target}>
	{@render children()}
</div>
