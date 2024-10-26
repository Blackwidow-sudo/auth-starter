<script lang="ts">
	import { page } from '$app/stores'

	import type { Route } from '$lib/routes'

	interface Props {
		routes: Route[]
	}

	let { routes }: Props = $props()
</script>

<nav class="flex min-w-32 flex-col items-center dark:bg-slate-900 dark:text-white">
	{#each routes as route (route.path)}
		<a
			class="block text-nowrap px-4 py-2 hover:underline"
			class:underline={$page.url.pathname === route.path}
			href={route.path}>
			{route.name}
		</a>
	{/each}
</nav>
