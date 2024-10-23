<script lang="ts">
	import { enhance } from '$app/forms'

	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()
</script>

<div>
	<h1>Register</h1>
	<form
		method="post"
		use:enhance>
		<div>
			<label for="email">Email</label>
			<input
				type="email"
				name="email"
				id="email" />
		</div>
		<div>
			<label for="username">Username</label>
			<input
				type="text"
				name="username"
				id="username" />
		</div>
		<div>
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				id="password" />
		</div>
		<div>
			<label for="password_confirmation">Confirm password</label>
			<input
				type="password"
				name="password_confirmation"
				id="password_confirmation" />
		</div>
		<button>Register</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
