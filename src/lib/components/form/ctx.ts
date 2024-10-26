import { getContext, hasContext, setContext } from 'svelte'

const formKey = Symbol('fields')

/**
 * Check if the form validation context exists
 *
 * @returns Whether the validation context exists
 */
export function hasFormCtx() {
	return hasContext(formKey)
}

/**
 * Set the validation context for the form
 *
 * @param ctx A map of field names to whether they are valid
 */
export function setFormCtx(ctx: Map<string, boolean>) {
	setContext(formKey, ctx)
}

/**
 * Get the validation context for the form
 *
 * @returns The validation context for the form
 */
export function getFormCtx() {
	return getContext(formKey) as Map<string, boolean>
}
