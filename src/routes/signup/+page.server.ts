import { db, table } from '$lib/server/db'
import { dev } from '$app/environment'
import { fail, redirect } from '@sveltejs/kit'
import { failWithErrors } from '$lib/components/form'
import { validatePassword, validateUsername, validateEmail } from '$lib/validation'
import * as auth from '$lib/server/auth'

import type { Actions, PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	if (locals.user) {
		return redirect(302, '/')
	}

	return {}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData()
		const email = formData.get('email')
		const username = formData.get('username')
		const password = formData.get('password')
		const pwConfirm = formData.get('password_confirmation')

		if (!validateEmail(email)) {
			return failWithErrors({ email: ['Invalid email'] })
		}

		if (!validateUsername(username)) {
			return failWithErrors({ username: ['Invalid username'] })
		}

		if (!validatePassword(password)) {
			return failWithErrors({ password: ['Invalid password'] })
		}

		if (password !== pwConfirm) {
			return failWithErrors({ passwordConfirmation: ['Passwords do not match'] })
		}

		const passwordHash = await auth.hashPassword(password)

		try {
			const [user] = await db
				.insert(table.users)
				.values({ username, email, passwordHash })
				.returning({ id: table.users.id })

			const session = await auth.createSession(user.id)

			cookies.set(auth.sessionCookieName, session.id, {
				path: '/',
				sameSite: 'lax',
				httpOnly: true,
				expires: session.expiresAt,
				secure: !dev
			})
		} catch (e: unknown) {
			if (dev) {
				console.error(e)
			}

			return fail(500, { message: 'An error has occurred' })
		}

		return redirect(302, '/account')
	}
} satisfies Actions
