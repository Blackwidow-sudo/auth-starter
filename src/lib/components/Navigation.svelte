<script lang="ts">
	import type { Route } from '$lib/routes'

	interface Props {
		routes: Route[]
	}

	let { routes }: Props = $props()
</script>

<nav class="flex flex-col flex-auto min-w-32 items-center border-r">
	{#each routes as route (route.path)}
		<a
			class="block px-4 py-2"
			href={route.path}>
			{route.name}
		</a>
	{/each}
</nav>
