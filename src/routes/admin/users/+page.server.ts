import { db, table } from '$lib/server/db'
import { error } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
	if (!locals.user?.isAdmin) {
		return error(401, 'Unauthorized')
	}

	const users = await db
		.select({
			id: table.users.id,
			username: table.users.username,
			email: table.users.email,
			isAdmin: table.users.isAdmin,
			createdAt: table.users.createdAt
		})
		.from(table.users)
		.orderBy(table.users.username)
		.limit(10)

	return {
		users
	}
}) satisfies PageServerLoad
