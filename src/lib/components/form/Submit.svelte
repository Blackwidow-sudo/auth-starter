<script lang="ts">
	import { cn } from '$lib/utils'

	import type { Snippet } from 'svelte'

	interface Props {
		[key: string]: any
		children: Snippet
		class?: string
	}

	let { children, class: cls = '', ...restProps }: Props = $props()
</script>

<button
	class={cn(
		'px-4 py-2 bg-green-500 hover:bg-green-600 transition-colors text-white rounded mx-auto block',
		cls
	)}
	type="submit"
	{...restProps}>
	{@render children()}
</button>
