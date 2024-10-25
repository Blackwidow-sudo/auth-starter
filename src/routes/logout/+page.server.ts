import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ locals, cookies }) => {
        if (!locals.session) {
			return fail(401)
		}

		await auth.invalidateSession(locals.session.id)

		cookies.delete(auth.sessionCookieName, { path: '/' })

		return redirect(302, '/login')
    }
} satisfies Actions;