<script lang="ts">
	import { cn } from '$lib/utils'
	import { page } from '$app/stores'

	import type { HTMLAttributes } from 'svelte/elements'
	import type { Route } from '$lib/routes'

	interface Props extends HTMLAttributes<HTMLElement> {
		routes: Route[]
	}

	let { routes, class: cls = '', ...restProps }: Props = $props()
</script>

<nav
	class={cn('w-full', cls)}
	{...restProps}>
	<ul class="menu menu-lg px-4 py-0 lg:menu-md">
		{#each routes as route (route.path)}
			<li>
				<a
					href={route.path}
					class:active={$page.url.pathname === route.path}>
					{route.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
