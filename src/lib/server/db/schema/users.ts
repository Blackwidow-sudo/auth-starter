import { pgTable, text, integer, timestamp, varchar, boolean } from 'drizzle-orm/pg-core'
import { timeStampMixin } from './mixins'

export const users = pgTable('users', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	username: varchar('username', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	isAdmin: boolean('is_admin').notNull().default(false),
	...timeStampMixin
})

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
})

export type Session = typeof sessions.$inferSelect
export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
