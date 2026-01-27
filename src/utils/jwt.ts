import jwt, { type SignOptions } from 'jsonwebtoken'

const secret = process.env['JWT_SECRET']
const expiresIn = (process.env['JWT_EXPIRES_IN'] || '8h') as any

export function generateToken(user: any): string | null {
  if (!secret) return null
  const options: SignOptions = { expiresIn }

  return jwt.sign(user, secret as string, options)
}
