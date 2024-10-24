<script lang="ts">
	import '../app.css'
	import { PUBLIC_APP_NAME } from '$env/static/public'
	import Navigation from '$lib/components/Navigation.svelte'
	import { routes } from '$lib/routes'

	let { children, data } = $props()
</script>

<div class="flex flex-col overflow-hidden size-full">
	<header
		class="flex-none z-10 border-b bg-gradient-to-r text-white from-indigo-500 via-purple-500 to-pink-500">
		<div class="flex flex-nowrap justify-between items-center">
			<a
				class="text-xl font-semibold px-4"
				href="/">
				{PUBLIC_APP_NAME}
			</a>
			<nav class="flex flex-nowra">
				{#if data.user}
					<a
						class="block px-4 py-2"
						href="/account">Account</a>
					<form
						action="/logout"
						method="post">
						<button class="block px-4 py-2">Logout</button>
					</form>
				{:else}
					<a
						class="block px-4 py-2"
						href="/signup">Sign Up</a>
					<a
						class="block px-4 py-2"
						href="/login">Log In</a>
				{/if}
			</nav>
		</div>
	</header>
	<div class="flex-auto flex size-full overflow-hidden">
		<aside class="flex-none overflow-x-hidden overflow-y-auto bg-slate-300">
			<Navigation {routes} />
		</aside>
		<div class="flex-1 flex flex-col overflow-x-hidden scroll-smooth">
			<main class="flex-auto container mx-auto">
				{@render children()}
			</main>
			<footer class="flex-none">
				<span class="block text-center">(footer)</span>
			</footer>
		</div>
	</div>
</div>
