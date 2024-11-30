<script lang="ts">
	import { cn } from '$lib/utils'
	import { fade, fly, type FadeParams, type FlyParams } from 'svelte/transition'
	import Portal from './Portal.svelte'

	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet
		open?: boolean
		side?: 'left' | 'right' | 'top' | 'bottom'
	}

	let {
		children,
		class: cls = '',
		open = $bindable(false),
		side = 'left',
		...restProps
	}: Props = $props()

	const fadeParams: FadeParams = {
		duration: 200
	}

	const flyParams: FlyParams = $derived.by(() => {
		const duration = 300

		switch (side) {
			case 'left':
				return { x: -50, y: 0, duration }
			case 'right':
				return { x: 50, y: 0, duration }
			case 'top':
				return { x: 0, y: -50, duration }
			case 'bottom':
				return { x: 0, y: 50, duration }
		}
	})

	function close() {
		open = false
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close()
		}
	}

	function onclick(e: Event) {
		if (e.target === e.currentTarget) {
			close()
		}
	}
</script>

<svelte:window {onkeydown} />

<Portal>
	{#if open}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-0 z-50 h-screen w-screen bg-white/30 backdrop-blur dark:bg-slate-700/30"
			{onclick}
			{onkeydown}
			transition:fade={fadeParams}>
		</div>
		<div
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			class={cn(
				'absolute z-50 bg-slate-300 dark:bg-slate-900',
				{
					'top-0': side !== 'bottom',
					'bottom-0': side !== 'top',
					'left-0': side !== 'right',
					'right-0': side !== 'left'
				},
				cls
			)}
			transition:fly={flyParams}
			{...restProps}>
			{@render children()}
		</div>
	{/if}
</Portal>
