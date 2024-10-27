import { tick } from 'svelte'

import type { Action } from 'svelte/action'

export const portal: Action<HTMLElement, string> = (el, target = 'body') => {
	$effect(() => {
		tick().then(() => {
			const targetEl = document.querySelector(target)

			if (!targetEl) {
				throw new Error(`Target element "${target}" not found`)
			}

			targetEl.appendChild(el)
			el.hidden = false
		})

		return () => {
			if (el.parentNode) {
				el.parentNode.removeChild(el)
			}
		}
	})
}
