<script lang="ts">
	import * as Form from '$lib/components/form'
	import { rules } from '$lib/validation'

	let { form } = $props()

	let password = $state('')
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="space-y-4 py-4">
	<h1 class="text-center text-xl font-bold">Register</h1>
	<Form.Form>
		<Form.Input
			errorMessages={form?.errors?.email}
			label="Email"
			name="email"
			type="email"
			placeholder="Enter your email..." />
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
		<Form.Submit>Sign Up</Form.Submit>
	</Form.Form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
