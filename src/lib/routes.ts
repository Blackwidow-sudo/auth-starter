export type Route = {
	name: string
	path: string
	public?: boolean
}

/**
 * All routes that are possible navigation targets.
 */
export const routes: Route[] = [
	{ name: 'Home', path: '/', public: true },
	{ name: 'Users', path: '/admin/users' }
]
