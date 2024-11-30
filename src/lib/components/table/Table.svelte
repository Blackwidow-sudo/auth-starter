<script module>
	type Header = {
		title: string
		key: string
		align?: 'left' | 'center' | 'right'
	}

	export type { Header }
</script>

<script
	lang="ts"
	generics="T extends { id: number; [key: string]: unknown}">
	import { cn } from '$lib/utils'

	import type { HTMLTableAttributes } from 'svelte/elements'
	import type { Snippet } from 'svelte'

	interface Props extends HTMLTableAttributes {
		actions?: Snippet<[T]>
		caption?: Snippet
		header?: Snippet<[Header]>
		headers: Header[]
		items: T[]
	}

	let { actions, caption, class: cls = '', header, headers, items, ...restProps }: Props = $props()

	const keys = $derived(headers.map((h) => h.key))
</script>

<table
	class={cn('w-full table-auto border-collapse border border-slate-500', cls)}
	{...restProps}>
	{#if caption}
		<caption class="mb-4 caption-top">
			{@render caption()}
		</caption>
	{/if}
	<thead class="bg-slate-50 dark:bg-slate-700">
		<tr>
			{#each headers as h (h.key)}
				<th
					class={cn('border-y border-slate-600 px-4 py-2 text-slate-900 dark:text-slate-200', {
						'text-left': h.align === 'left' || !h.align,
						'text-center': h.align === 'center',
						'text-right': h.align === 'right'
					})}>
					{#if header}
						{@render header(h)}
					{:else}
						{h.title}
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each items as item (item.id)}
			<tr>
				{#each keys as key (key)}
					<td class="border-y border-slate-700 px-4 py-2">
						{#if typeof actions === 'function' && key === 'actions'}
							{@render actions(item)}
						{:else}
							{item[key] instanceof Date ? item[key].toLocaleString() : item[key]}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
