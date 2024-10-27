export type Route = {
	name: string
	path: string
	public?: boolean
}

/**
 * All routes that are possible navigation targets.
 *
 * The server throws an error when a user tries to access a route that is not defined.
 * Only public routes can be accessed without authentication.
 */
export const routes: Route[] = [{ name: 'Home', path: '/', public: true }]
