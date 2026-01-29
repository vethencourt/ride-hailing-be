import bcrypt from 'bcrypt'
import { users } from './constants/users.js'
import { User } from '../models/user.model.js'

export const seedUsers = async () => {
  console.log('Clearing existing users...')
  await User.deleteMany({})

  // process passwords
  console.log('Hashing passwords...')
  const saltRounds = Number(process.env['SALT_ROUNDS']) || 10
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds)
      return {
        ...user,
        password: hashedPassword
      }
    })
  )

  // insert users
  await User.insertMany(hashedUsers)
  console.log(`✅ Successfully seeded ${hashedUsers.length} users`)
}
