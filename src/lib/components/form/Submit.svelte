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
		'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mx-auto block disabled:opacity-50 transition disabled:cursor-not-allowed',
		cls
	)}
	type="submit"
	disabled={!isValid}
	{...restProps}>
	{@render children()}
</button>
