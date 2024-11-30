import { fail } from '@sveltejs/kit'

export function failWithErrors(errors: Record<string, string[]>, status = 400) {
	return fail(status, { errors })
}

export { default as Form } from './Form.svelte'
export { default as Input } from './Input.svelte'
