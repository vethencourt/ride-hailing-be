import { Types } from 'mongoose'

import { makes } from './constants/makes.js'
import { models } from './constants/models.js'
import { years } from './constants/years.js'

import { Make, Car, Year } from '../models/meta.model.js'

export const seedMeta = async () => {
  console.log('Clearing existing metadata...')
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
}
