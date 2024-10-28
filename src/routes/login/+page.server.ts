import { db, table } from '$lib/server/db'
import { dev } from '$app/environment'
import { eq } from 'drizzle-orm'
import { failWithErrors } from '$lib/components/form'
import { redirect } from '@sveltejs/kit'
import { validateEmail, validatePassword } from '$lib/validation'
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
		const password = formData.get('password')

		if (!validateEmail(email)) {
			return failWithErrors({ email: ['Invalid email'] })
		}
		if (!validatePassword(password)) {
			return failWithErrors({ password: ['Invalid password'] })
		}

		const [user] = await db.select().from(table.users).where(eq(table.users.email, email))

		if (!user) {
			return failWithErrors({
				email: ['Incorrect email or password'],
				password: ['Incorrect email or password']
			})
		}

		const validPassword = await auth.verifyPassword(user.passwordHash, password)

		if (!validPassword) {
			return failWithErrors({
				email: ['Incorrect email or password'],
				password: ['Incorrect email or password']
			})
		}

		const session = await auth.createSession(user.id)

		cookies.set(auth.sessionCookieName, session.id, {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			expires: session.expiresAt,
			secure: !dev
		})

		return redirect(302, '/account')
	}
} satisfies Actions
