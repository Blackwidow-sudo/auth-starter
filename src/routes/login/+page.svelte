<script lang="ts">
	import * as Form from '$lib/components/form'
	import { rules } from '$lib/validation/index.js'

	let { form } = $props()
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="space-y-4 py-4">
	<h1 class="text-center text-xl font-bold">Login</h1>
	<Form.Form>
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
		<Form.Submit>Sign In</Form.Submit>
	</Form.Form>
</div>
