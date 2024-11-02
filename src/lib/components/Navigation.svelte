<script lang="ts">
	import { cn } from '$lib/utils'
	import { page } from '$app/stores'

	import type { Route } from '$lib/routes'

	interface Props {
		[key: string]: unknown
		class?: HTMLElement['className']
		routes: Route[]
	}

	let { routes, class: cls = '', ...restProps }: Props = $props()
</script>

<nav>
	<ul class="menu menu-lg px-4 py-0 lg:menu-md">
		{#each routes as route (route.path)}
			<li>
				<a
					href={route.path}
					class:active={$page.url.pathname === route.path}>{route.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<!-- <nav
	class={cn('grid min-w-36 items-center bg-slate-300 py-1 dark:bg-slate-900', cls)}
	{...restProps}>
	{#each routes as route (route.path)}
		<a
			class="block text-nowrap px-4 py-2 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
			class:bg-slate-200={$page.url.pathname === route.path}
			class:dark:bg-slate-800={$page.url.pathname === route.path}
			href={route.path}>
			{route.name}
		</a>
	{/each}
</nav> -->
