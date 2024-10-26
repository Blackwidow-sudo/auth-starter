import { fail } from '@sveltejs/kit'

export type ErrorBag = {
	[key: string]: string[]
}

export function failWithErrors(errors: ErrorBag, status = 400) {
	return fail(status, { errors })
}

export { default as Form } from './Form.svelte'
export { default as Input } from './Input.svelte'
export { default as Submit } from './Submit.svelte'
