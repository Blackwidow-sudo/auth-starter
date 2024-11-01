import type { Action } from 'svelte/action'

export const portal: Action<HTMLElement, string> = (el, target = 'body') => {
	$effect(() => {
		const targetEl = document.querySelector(target)

		if (!targetEl) {
			throw new Error(`Target element "${target}" not found`)
		}

		const portal =
			document.querySelector(`[data-portal="${target}"]`) || document.createElement('div')

		if (!(portal instanceof HTMLElement)) {
			throw new Error(`[data-portal="${target}"] is not an HTMLElement`)
		}

		portal.dataset.portal = target
		portal.appendChild(el)
		targetEl.appendChild(portal)

		el.hidden = false

		return () => {
			if (portal.parentNode) {
				portal.parentNode.removeChild(portal)
			}
		}
	})
}
