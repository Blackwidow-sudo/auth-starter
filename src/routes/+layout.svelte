<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import { PUBLIC_APP_NAME } from '$env/static/public'
	import { routes } from '$lib/routes'
	import Navigation from '$lib/components/Navigation.svelte'

	let { children, data } = $props()
</script>

<div class="flex size-full flex-col overflow-hidden dark:text-white">
	<header
		class="z-10 flex-none border-b border-slate-500 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
		<div class="flex flex-nowrap items-center justify-between">
			<a
				class="px-4 text-xl font-semibold"
				href="/">
				{PUBLIC_APP_NAME}
			</a>
			<nav class="flex-nowra flex">
				{#if data.user}
					<a
						class="block px-4 py-2 hover:underline"
						class:underline={$page.url.pathname === '/account'}
						href="/account">Account</a>
					<form
						action="/logout"
						method="post">
						<button class="block px-4 py-2 hover:underline">Logout</button>
					</form>
				{:else}
					<a
						class="block px-4 py-2 hover:underline"
						class:underline={$page.url.pathname === '/signup'}
						href="/signup">Sign Up</a>
					<a
						class="block px-4 py-2 hover:underline"
						class:underline={$page.url.pathname === '/login'}
						href="/login">Log In</a>
				{/if}
			</nav>
		</div>
	</header>
	<div class="flex size-full flex-auto overflow-hidden">
		<aside
			class="scrollbar-thin flex-none overflow-y-auto overflow-x-hidden border-r border-slate-400 bg-slate-300 dark:border-slate-700 dark:bg-slate-900">
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
