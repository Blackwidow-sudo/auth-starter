<script lang="ts">
	import Table, { type Header } from '$lib/components/table/Table.svelte'

	let { data } = $props()

	const headers: Header[] = [
		{ title: 'Username', key: 'username' },
		{ title: 'Email', key: 'email' },
		{ title: 'Admin', key: 'isAdmin' },
		{ title: 'Created At', key: 'createdAt' },
		{ title: 'Actions', key: 'actions', align: 'center' }
	]

	function onEdit(item: Record<string, any>) {
		console.log(item)
	}

	function onDelete(item: Record<string, any>) {}
</script>

<div class="space-y-4 p-4">
	<Table
		{headers}
		items={data.users}>
		{#snippet caption()}
			<h1 class="text-xl font-semibold">Users</h1>
		{/snippet}
		{#snippet actions(item)}
			<button
				class="rounded bg-slate-400 px-4 py-2"
				onclick={() => onEdit(item)}>
				✏
			</button>
			<button
				class="rounded bg-slate-400 px-4 py-2"
				onclick={() => onDelete(item)}>
				🗑
			</button>
		{/snippet}
	</Table>
</div>
