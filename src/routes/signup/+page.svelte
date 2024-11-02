<script lang="ts">
	import * as Form from '$lib/components/form'
	import { rules } from '$lib/validation'

	let { form } = $props()

	let password = $state('')
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="space-y-4 p-4">
	<Form.Form
		class="mx-auto"
		title="Register">
		<Form.Input
			errorMessages={form?.errors?.email}
			label="Email"
			name="email"
			placeholder="Enter your email..."
			rules={rules.email}
			type="email" />
		<Form.Input
			errorMessages={form?.errors?.username}
			label="Username"
			name="username"
			placeholder="Enter your username..."
			rules={rules.username}
			type="text" />
		<Form.Input
			errorMessages={form?.errors?.password}
			label="Password"
			name="password"
			placeholder="Enter your password..."
			rules={rules.password}
			type="password"
			bind:value={password} />
		<Form.Input
			errorMessages={form?.errors?.passwordConfirmation}
			label="Confirm password"
			name="password_confirmation"
			placeholder="Confirm your password..."
			rules={[...rules.required, ...rules.match(password, 'Password')]}
			type="password" />
		{#snippet actions()}
			<button class="btn btn-primary">Sign Up</button>
		{/snippet}
	</Form.Form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
