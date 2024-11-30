<script lang="ts">
	import * as Form from '$lib/components/form'
	import { rules } from '$lib/validation/index.js'

	let { form } = $props()
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="space-y-4 p-4">
	<Form.Form
		class="mx-auto"
		title="Login">
		<Form.Input
			errorMessages={form?.errors?.email}
			label="Email"
			name="email"
			placeholder="Enter your email..."
			rules={rules.email}
			type="email" />
		<Form.Input
			errorMessages={form?.errors?.password}
			label="Password"
			name="password"
			placeholder="Enter your password..."
			rules={rules.password}
			type="password" />
		{#snippet actions()}
			<button class="btn btn-primary">Sign In</button>
		{/snippet}
	</Form.Form>
</div>
