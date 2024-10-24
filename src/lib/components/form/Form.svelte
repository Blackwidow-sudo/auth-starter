<script lang="ts">
	import { cn } from '$lib/utils'
	import { enhance } from '$app/forms'

	import type { Snippet } from 'svelte'

	interface Props {
		[key: string]: any
		action?: string
		children: Snippet
		class?: string
	}

	let { children, action, class: cls = '', onsubmit, ...restProps }: Props = $props()
</script>

<form
	class={cn('space-y-4 p-4 border rounded max-w-md mx-auto shadow bg-slate-200', cls)}
	action={action || ''}
	method="post"
	{onsubmit}
	{...restProps}
	use:enhance>
	{@render children()}
</form>
