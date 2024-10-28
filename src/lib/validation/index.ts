export function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-zA-Z0-9_-]+$/.test(username)
	)
}

export function validatePassword(password: unknown): password is string {
	return typeof password === 'string' && password.length >= 8 && password.length <= 255
}

export function validateEmail(email: unknown): email is string {
	return (
		typeof email === 'string' && email.length <= 256 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	)
}

export function required(value: unknown) {
	return (typeof value === 'string' && value.trim().length > 0) || 'Field is required'
}

/**
 * Validation rules for form fields
 */
export const rules = {
	required: [required],
	email: [required, (v: unknown) => validateEmail(v) || 'Invalid email'],
	password: [required, (v: unknown) => validatePassword(v) || 'Invalid password'],
	match: (x: unknown, field: string) => [(v: unknown) => v === x || `${field} does not match`],
	username: [required, (v: unknown) => validateUsername(v) || 'Invalid username']
}
