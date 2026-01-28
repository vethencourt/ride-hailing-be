import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  const SALT_ROUNDS = Number(process.env['SALT_ROUNDS']) || 10
  return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  return await bcrypt.compare(password, storedHash)
}
