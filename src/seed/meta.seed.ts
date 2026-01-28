import mongoose, { Types } from 'mongoose'
import dotenv from 'dotenv'

import { makes } from './makes.js'
import { models } from './models.js'
import { years } from './years.js'

import { Make, Car, Year } from '../models/meta.model.js'

dotenv.config()

const seedDatabase = async () => {
  try {
    const mongoUri = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/ride-hailing-be'
    await mongoose.connect(mongoUri)
    console.log('🔗 Connected to MongoDB')

    console.log('🧹 Clearing existing metadata...')
    await Make.deleteMany({})
    await Car.deleteMany({})
    await Year.deleteMany({})

    // process makes
    const makeIdMap = new Map<string, Types.ObjectId>()
    const makePayloads = []

    for (const make of makes) {
      const newId = new Types.ObjectId()
      makeIdMap.set(make.id, newId)

      makePayloads.push({
        _id: newId,
        name: make.name
      })
    }

    await Make.insertMany(makePayloads)
    console.log(`✅ Seeded ${makePayloads.length} makes`)

    // process models
    const modelIdMap = new Map<string, Types.ObjectId>()
    const modelPayloads = []

    for (const model of models) {
      const parentMakeId = makeIdMap.get(model.makeId)

      if (!parentMakeId) {
        console.warn(`⚠️ Warning: Make ID ${model.makeId} not found for Model ${model.name}`)
        continue
      }

      const newId = new Types.ObjectId()
      modelIdMap.set(model.id, newId)

      modelPayloads.push({
        _id: newId,
        name: model.name,
        makeId: parentMakeId
      })
    }

    await Car.insertMany(modelPayloads)
    console.log(`✅ Seeded ${modelPayloads.length} models`)

    // process years
    const yearPayloads = []

    for (const year of years) {
      const parentModelId = modelIdMap.get(year.modelId)

      if (!parentModelId) {
        console.warn(`⚠️ Warning: Model ID ${year.modelId} not found for Year entry`)
        continue
      }

      yearPayloads.push({
        value: year.value,
        modelId: parentModelId
      })
    }

    await Year.insertMany(yearPayloads)
    console.log(`✅ Seeded ${yearPayloads.length} years`)

    console.log('🎉 Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
