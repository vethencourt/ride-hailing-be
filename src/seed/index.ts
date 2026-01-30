import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { seedUsers } from './user.seed.js'
import { seedMeta } from './meta.seed.js'
import { seedVehicles } from './vehicle.seed.js'

dotenv.config()

export const runSeeder = async () => {
  try {
    const mongoUri = process.env['MONGODB_URI'] as string
    console.log('Starting Database Seeder...')
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    // users must be seeded before Vehicles
    await seedUsers()
    await seedMeta()
    await seedVehicles()

    console.log('✅✅✅ All collections seeded successfully!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('Disconnected from MongoDB')
    process.exit(0)
  }
}

runSeeder()
