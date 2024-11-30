<script lang="ts">
	import { cn } from '$lib/utils'
	import { enhance } from '$app/forms'
	import { setFormCtx } from './ctx'
	import { SvelteMap } from 'svelte/reactivity'

	import type { HTMLFormAttributes } from 'svelte/elements'
	import type { Snippet } from 'svelte'
	import type { SubmitFunction } from '@sveltejs/kit'

	interface Props extends HTMLFormAttributes {
		actions?: Snippet<[SvelteMap<string, boolean>]>
		children: Snippet
		title?: string
	}

	let { actions, children, class: cls = '', onsubmit, title, ...restProps }: Props = $props()

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
	class={cn('card max-w-md bg-base-200 shadow-xl', cls)}
	method="post"
	{onsubmit}
	{...restProps}
	use:enhance={submitFn}>
	<div class="card-body">
		{#if title}
			<h2 class="card-title">{title}</h2>
		{/if}
		{@render children()}
		<div class="card-actions justify-center gap-2">
			{@render actions?.(fieldCtx)}
		</div>
	</div>
</form>
