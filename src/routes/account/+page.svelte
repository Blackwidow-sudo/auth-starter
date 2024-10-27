<script lang="ts">
	let { data, form } = $props()

	const user = $state(data.user)
</script>

<svelte:head>
	<title>My account</title>
</svelte:head>

<div class="space-y-4 py-4">
	<div class="mx-auto max-w-md rounded border border-slate-500 p-4 dark:bg-slate-800">
		<h1 class="text-xl font-semibold">
			Hello {user?.username}
		</h1>
		<p class="text-slate-700 dark:text-slate-400">
			You are logged in as {user?.email}
		</p>
	</div>
</div>
