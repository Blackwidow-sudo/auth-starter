import { dev } from '$app/environment'
import { routes } from '$lib/routes'
import * as auth from '$lib/server/auth'

import { error, redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(auth.sessionCookieName)

	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null
		return resolve(event)
	}

	const { session, user } = await auth.validateSession(sessionId)

	if (session) {
		event.cookies.set(auth.sessionCookieName, session.id, {
			path: '/',
			sameSite: 'lax',
			httpOnly: true,
			expires: session.expiresAt,
			secure: !dev
		})
	} else {
		event.cookies.delete(auth.sessionCookieName, { path: '/' })
	}

	event.locals.user = user
	event.locals.session = session

	return resolve(event)
}

// FIXME: Error gets thrown on /signup and /login
const handleRoutes: Handle = async ({ event, resolve }) => {
	const authRoutes = ['/signup', '/login']
	const targetRoute = routes.find(({ path }) => path === event.url.pathname)
	const isAuthRoute = authRoutes.includes(event.url.pathname)

	if (!targetRoute || !isAuthRoute) {
		return error(404, `${event.url.pathname} not found. Is auth route? ${isAuthRoute}`)
	}

	const authenticated = !!event.locals.user

	if (authenticated && authRoutes.includes(targetRoute.path)) {
		return redirect(302, '/')
	}

	if (!authenticated && !targetRoute.public) {
		return redirect(302, '/login')
	}

	return resolve(event)
}

export const handle: Handle = sequence(handleAuth)
