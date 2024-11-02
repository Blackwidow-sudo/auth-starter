<script lang="ts">
	import '../app.css'
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { PUBLIC_APP_NAME } from '$env/static/public'
	import { routes } from '$lib/routes'
	import Navigation from '$lib/components/Navigation.svelte'

	let { children, data } = $props()
</script>

<div class="drawer bg-base-100 lg:drawer-open">
	<input
		id="sidebar"
		type="checkbox"
		class="drawer-toggle" />
	<div class="drawer-content">
		<div
			class="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]">
			<nav class="navbar w-full">
				<div class="flex flex-1 md:gap-1 lg:gap-2">
					<span
						class="tooltip tooltip-bottom before:text-xs"
						data-tip="Menu">
						<label
							for="sidebar"
							aria-label="Open menu"
							class="btn btn-square btn-ghost drawer-button lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</label>
					</span>
				</div>
				<div class="flex-none">
					<ul class="menu menu-horizontal gap-2 px-1">
						{#if data.user}
							<li>
								<a
									class:active={$page.url.pathname === '/account'}
									href="/account">Account</a>
							</li>
							<li>
								<form
									action="/logout"
									method="post"
									use:enhance>
									<button>Logout</button>
								</form>
							</li>
						{:else}
							<li>
								<a
									class:active={$page.url.pathname === '/signup'}
									href="/signup">Sign Up</a>
							</li>
							<li>
								<a
									class:active={$page.url.pathname === '/login'}
									href="/login">Log In</a>
							</li>
						{/if}
					</ul>
				</div>
			</nav>
		</div>
		<div class="max-w-[100vw] px-6 pb-16 xl:pr-2">
			<main class="container mx-auto">
				{@render children()}
			</main>
		</div>
	</div>
	<!-- Sidebar -->
	<div class="drawer-side z-40">
		<label
			for="sidebar"
			class="drawer-overlay"
			aria-label="Close menu"></label>
		<aside class="min-h-screen w-80 bg-base-100">
			<div
				class="sticky top-0 z-20 flex items-center gap-2 bg-base-100 bg-opacity-90 px-4 py-2 shadow-sm backdrop-blur">
				<a
					class="btn btn-ghost flex-none px-2"
					href="/">
					<span class="font-title inline-flex text-lg md:text-2xl">{PUBLIC_APP_NAME}</span>
				</a>
			</div>
			<div class="h-4"></div>
			<Navigation {routes} />
		</aside>
	</div>
</div>
