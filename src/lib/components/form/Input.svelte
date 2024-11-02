<script lang="ts">
	import { cn } from '$lib/utils'
	import { fly } from 'svelte/transition'
	import { hasFormCtx, getFormCtx } from './ctx'

	import type { HTMLInputAttributes } from 'svelte/elements'

	interface Props extends HTMLInputAttributes {
		errorMessages?: string[]
		label?: string
		maxErrors?: number
		name: string
		rules?: Array<(value: string) => boolean | string>
	}

	let {
		autocomplete = 'off',
		class: cls = '',
		errorMessages,
		label,
		maxErrors = 1,
		name,
		rules,
		value = $bindable(''),
		...restProps
	}: Props = $props()

	let gotInteraction = $state(false)

	if (hasFormCtx()) {
		$effect(() => {
			const ctx = getFormCtx()

			// Set the field's validation state in the form context
			ctx.set(name, gotInteraction && errors.length === 0)
		})
	}

	/**
	 * Collection of errors based on the rules and errorMessages
	 */
	let errors = $derived.by(() => {
		if (!gotInteraction) {
			return []
		}

		const ruleErrors = rules?.map((r) => r(value as string)).filter((r) => typeof r === 'string')

		return [...(errorMessages || []), ...(ruleErrors ? ruleErrors : [])]
	})

	/**
	 * Marks the input as interacted with
	 */
	function interact() {
		gotInteraction = true
	}
</script>

<label class="form-control w-full max-w-sm">
	<div
		class="label"
		class:hidden={!label}>
		<span class="label-text">{label}</span>
	</div>
	<input
		type="text"
		class={cn('input input-bordered w-full max-w-sm', cls)}
		class:input-error={errors.length}
		{name}
		{...restProps}
		onblur={interact}
		oninput={interact}
		bind:value />
	<div class="label min-h-4 py-0">
		{#each errors.slice(0, maxErrors) as err}
			<div
				class="label-text-alt min-h-4 text-xs text-red-600 dark:text-red-400"
				transition:fly={{ y: -5, duration: 200 }}>
				{err}
			</div>
		{/each}
	</div>
</label>

<!-- <div
	class="dark:text-slate-200"
	data-type="sv-input">
	<label
		class="block w-full"
		for={id || name}>{label}</label>
	<input
		{name}
		class={cn(
			'mt-1 block w-full rounded transition-colors dark:bg-slate-700 dark:placeholder:text-slate-400',
			{
				'border-red-600': errors.length,
				'dark:border-red-400': errors.length
			},
			cls
		)}
		id={id || name}
		type={type || 'text'}
		onblur={interact}
		oninput={interact}
		{...restProps}
		bind:value />
	<div
		role="alert"
		class="min-h-4 px-1 text-xs text-red-600 dark:text-red-400">
		{#each errors.slice(0, maxErrors) as err}
			<div transition:fly={{ y: -5, duration: 200 }}>
				{err}
			</div>
		{/each}
	</div>
</div> -->
