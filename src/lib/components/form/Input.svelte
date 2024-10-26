<script lang="ts">
	import { cn } from '$lib/utils'
	import { fly } from 'svelte/transition'
	import { hasFormCtx, getFormCtx } from './ctx'

	interface Props {
		[key: string]: any
		autocomplete?: HTMLInputElement['autocomplete']
		class?: HTMLInputElement['className']
		errorMessages?: string[]
		id?: string
		label?: string
		maxErrors?: number
		name: HTMLInputElement['name']
		rules?: Array<(value: string) => boolean | string>
		type?: HTMLInputElement['type']
		value?: HTMLInputElement['value']
	}

	let {
		autocomplete = 'off',
		class: cls = '',
		errorMessages,
		id,
		label,
		maxErrors = 1,
		name,
		rules,
		type,
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

<div
	class="dark:text-white"
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
</div>
