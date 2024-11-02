<script lang="ts">
	let { data, form } = $props()

	const user = $state(data.user)
</script>

<svelte:head>
	<title>My account</title>
</svelte:head>

<div class="space-y-4 p-4">
	<div class="card mx-auto max-w-md bg-base-200">
		<div class="card-body">
			<h2 class="card-title">{user?.username}</h2>
			<p>You are logged in as {user?.email}</p>
		</div>
	</div>
</div>
