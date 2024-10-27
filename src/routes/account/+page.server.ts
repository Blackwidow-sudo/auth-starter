import { redirect } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/login')
	}

	return {}
}) satisfies PageServerLoad
