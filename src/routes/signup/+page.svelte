<script lang="ts">
	import * as Form from '$lib/components/form'

	import type { ActionData } from './$types'

	interface Props {
		form: ActionData
	}

	let { form }: Props = $props()
</script>

<div class="py-4">
	<h1 class="text-xl font-bold text-center">Register</h1>
	<Form.Form>
		<Form.Input
			label="Email"
			type="email"
			name="email"
			placeholder="Enter your email..." />
		<Form.Input
			label="Username"
			type="text"
			name="username"
			placeholder="Enter your username..." />
		<Form.Input
			label="Password"
			type="password"
			name="password"
			placeholder="Enter your password..." />
		<Form.Input
			label="Confirm password"
			type="password"
			name="password_confirmation"
			placeholder="Confirm your password..." />
		<Form.Submit>Sign Up</Form.Submit>
	</Form.Form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
