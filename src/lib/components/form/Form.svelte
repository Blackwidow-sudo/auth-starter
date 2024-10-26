<script lang="ts">
	import { cn } from '$lib/utils'
	import { enhance } from '$app/forms'
	import { setFormCtx } from './ctx'
	import { SvelteMap } from 'svelte/reactivity'

	import type { Snippet } from 'svelte'
	import type { SubmitFunction } from '@sveltejs/kit'

	interface Props {
		[key: string]: any
		action?: HTMLFormElement['action']
		children: Snippet
		class?: string
		onsubmit?: (event: Event) => void
	}

	let { children, action, class: cls = '', onsubmit, ...restProps }: Props = $props()

	/**
	 * Map that holds the validation state of each child field
	 */
	let fieldCtx = new SvelteMap<string, boolean>()

	setFormCtx(fieldCtx)

	// Only enhance the form when submission isn't handled by the consumer
	const submitFn = $derived.by(() => {
		if (typeof onsubmit === 'function') {
			return function ({ cancel }) {
				return cancel()
			} satisfies SubmitFunction
		}

		return undefined
	}) satisfies SubmitFunction | undefined
</script>

<form
	class={cn(
		'mx-auto max-w-md space-y-1 rounded-md border border-slate-300 bg-slate-100 p-6 shadow-md dark:border-slate-500 dark:bg-slate-800 dark:shadow-slate-700',
		cls
	)}
	action={action || ''}
	method="post"
	{onsubmit}
	{...restProps}
	use:enhance={submitFn}>
	{@render children()}
</form>
