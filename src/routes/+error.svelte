<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="space-y-4 p-4">
	<h1 class="text-center text-xl font-semibold text-red-600 dark:text-red-400">
		{$page.status}: {$page.error?.message}
	</h1>
</div>
