import { vehicles } from './vehicles.js'
import { Vehicle } from '../models/vehicle.model.js'
import { User } from '../models/user.model.js'

export const seedVehicles = async () => {
  console.log('🧹 Clearing existing vehicles...')
  await Vehicle.deleteMany({})

  const user = await User.findOne()
  if (!user) throw new Error('❌ No users found to associate with vehicles.')

  const vehiclePayloads = vehicles.map((v) => ({
    ...v,
    createdBy: user._id,
    updatedBy: user._id
  }))

  await Vehicle.insertMany(vehiclePayloads)
  console.log(`✅ Seeded ${vehiclePayloads.length} vehicles`)
}
