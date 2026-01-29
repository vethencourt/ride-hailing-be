import { vehicles } from './constants/vehicles.js'
import { Vehicle } from '../models/vehicle.model.js'
import { User } from '../models/user.model.js'

export const seedVehicles = async () => {
  console.log('Clearing existing vehicles...')
  await Vehicle.deleteMany({})

  const users = await User.find()
  if (!users.length) throw new Error('❌ No users found to associate with vehicles.')

  const vehiclePayloads = vehicles.map((v, i) => ({
    ...v,
    createdBy: users[i % users.length]!._id,
    updatedBy: users[i % users.length]!._id
  }))

  await Vehicle.insertMany(vehiclePayloads)
  console.log(`✅ Seeded ${vehiclePayloads.length} vehicles`)
}
