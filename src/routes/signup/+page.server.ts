import { fail, redirect } from '@sveltejs/kit'
import * as auth from '$lib/server/auth'
import { db, table } from '$lib/server/db'
import { validatePassword, validateUsername, validateEmail } from '$lib/server/validation'
import { hash } from '@node-rs/argon2'
import { dev } from '$app/environment'

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
		const username = formData.get('username')
		const password = formData.get('password')
		const email = formData.get('email')

		if (!validateEmail(email)) {
			return fail(400, { message: 'Invalid email' })
		}
		if (!validateUsername(username)) {
			return fail(400, { message: 'Invalid username' })
		}
		if (!validatePassword(password)) {
			return fail(400, { message: 'Invalid password' })
		}

		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		})

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
			console.error(e)

			return fail(500, { message: 'An error has occurred' })
		}

		return redirect(302, '/demo/lucia')
	}
} satisfies Actions
