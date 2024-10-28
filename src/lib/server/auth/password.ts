import { hash, verify, type Options } from '@node-rs/argon2'

// recommended minimum parameters
const hashOptions: Options = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
}

export async function hashPassword(password: string) {
	return hash(password, hashOptions)
}

export async function verifyPassword(hash: string, password: string) {
	return verify(hash, password, hashOptions)
}
