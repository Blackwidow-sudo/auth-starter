<script lang="ts">
	import '../app.css'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { PUBLIC_APP_NAME } from '$env/static/public'
	import { routes as allRoutes } from '$lib/routes'
	import * as Drawer from '$lib/components/dialogs'
	import Navigation from '$lib/components/Navigation.svelte'

	let { children, data } = $props()

	let open = $state(false)

	const routes = $derived(allRoutes.filter((r) => (!r.public ? data.user?.isAdmin : true)))

	function onToggleDrawer() {
		open = !open
	}
</script>

<div class="flex size-full flex-col overflow-hidden dark:text-white">
	<header
		class="z-10 flex-none border-b border-slate-400 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 p-2 text-white dark:border-slate-700">
		<div class="flex flex-nowrap items-center justify-between">
			<div class="flex items-center justify-center">
				<Drawer.Trigger
					class="md:hidden"
					onclick={onToggleDrawer} />
				<Drawer.Drawer
					class="min-w-56 border-r border-slate-400 dark:border-slate-700"
					bind:open>
					<a
						class="block text-nowrap border-b border-slate-400 p-4 text-xl font-semibold dark:border-slate-700 dark:text-slate-300"
						href="/">
						{PUBLIC_APP_NAME}
					</a>
					<Navigation
						{routes}
						onclick={onToggleDrawer} />
				</Drawer.Drawer>
				<a
					class="text-nowrap px-4 text-xl font-semibold"
					href="/">
					{PUBLIC_APP_NAME}
				</a>
			</div>
			<nav class="flex flex-nowrap">
				{#if data.user}
					<a
						class="block px-4 hover:underline"
						class:underline={$page.url.pathname === '/account'}
						href="/account">Account</a>
					<form
						action="/logout"
						method="post"
						use:enhance>
						<button class="block px-4 hover:underline">Logout</button>
					</form>
				{:else}
					<a
						class="block px-4 hover:underline"
						class:underline={$page.url.pathname === '/signup'}
						href="/signup">Sign Up</a>
					<a
						class="block px-4 hover:underline"
						class:underline={$page.url.pathname === '/login'}
						href="/login">Log In</a>
				{/if}
			</nav>
		</div>
	</header>
	<div class="flex size-full flex-auto overflow-hidden">
		<aside
			class="scrollbar-thin hidden flex-none overflow-y-auto overflow-x-hidden border-r border-slate-400 bg-slate-300 md:block dark:border-slate-700 dark:bg-slate-900">
			<Navigation {routes} />
		</aside>
		<div
			class="flex flex-1 flex-col overflow-x-hidden scroll-smooth dark:bg-slate-950 dark:text-slate-300">
			<main class="container mx-auto flex-auto">
				{@render children()}
			</main>
			<footer class="flex-none">
				<span class="block text-center">(footer)</span>
			</footer>
		</div>
	</div>
</div>

<style>
	:global(.scrollbar-thin) {
		scrollbar-width: thin;
		scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
	}
</style>
