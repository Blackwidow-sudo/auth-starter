<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import { PUBLIC_APP_NAME } from '$env/static/public'
	import { routes } from '$lib/routes'
	import Navigation from '$lib/components/Navigation.svelte'

	let { children, data } = $props()
</script>

<div class="flex size-full flex-col overflow-hidden">
	<header
		class="z-10 flex-none border-b bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
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
		<aside class="scrollbar-thin flex-none overflow-y-auto overflow-x-hidden bg-slate-300">
			<Navigation {routes} />
		</aside>
		<div
			class="flex flex-1 flex-col overflow-x-hidden scroll-smooth bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-900">
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
