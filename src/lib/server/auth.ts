import { db, table } from '$lib/server/db'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { eq } from 'drizzle-orm'
import { sha256 } from '@oslojs/crypto/sha2'

const DAY_IN_MS = 1000 * 60 * 60 * 24

export const sessionCookieName = 'auth-session'

function generateSessionToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(20))
	const token = encodeBase32LowerCaseNoPadding(bytes)

	return token
}

export async function createSession(userId: number): Promise<table.Session> {
	const token = generateSessionToken()
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	}

	await db.insert(table.sessions).values(session)

	return session
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(table.sessions).where(eq(table.sessions.id, sessionId))
}

export async function validateSession(sessionId: string) {
	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.users.id, username: table.users.username },
			session: table.sessions
		})
		.from(table.sessions)
		.innerJoin(table.users, eq(table.sessions.userId, table.users.id))
		.where(eq(table.sessions.id, sessionId))

	if (!result) {
		return { session: null, user: null }
	}

	const { session, user } = result

	const sessionExpired = Date.now() >= session.expiresAt.getTime()

	if (sessionExpired) {
		await db.delete(table.sessions).where(eq(table.sessions.id, session.id))

		return { session: null, user: null }
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15

	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30)

		await db
			.update(table.sessions)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.sessions.id, session.id))
	}

	return { session, user }
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSession>>
