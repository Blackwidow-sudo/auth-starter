<script lang="ts">
	import { cn } from '$lib/utils'
	import { hasFormCtx, getFormCtx } from './ctx'

	import type { Snippet } from 'svelte'

	interface Props {
		[key: string]: any
		children: Snippet
		class?: HTMLButtonElement['className']
	}

	let { children, class: cls = '', ...restProps }: Props = $props()

	let isValid = $derived.by(() => {
		if (!hasFormCtx()) {
			return true
		}

		const ctx = getFormCtx()

		return ctx.size > 0 && ctx.values().every((v) => v)
	})
</script>

<button
	class={cn(
		'mx-auto block rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50',
		cls
	)}
	type="submit"
	{...restProps}>
	{@render children()}
</button>
