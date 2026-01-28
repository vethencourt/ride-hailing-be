import { MakeModel, CarModel, YearModel } from '../models/meta.model.js'
import type { IMake, IModel, IYear } from '../types/meta.types.js'
import type { ServiceResponse } from '../types/types.js'
import { meta500 } from '../utils/errors.js'

export const getMakes = async (): Promise<ServiceResponse<IMake[]>> => {
  try {
    const makes = await MakeModel.find().sort({ name: 1 })
    return { success: true, data: makes }
  } catch (error) {
    return meta500 as ServiceResponse<IMake[]>
  }
}

export const getModelsByMake = async (makeId: string): Promise<ServiceResponse<IModel[]>> => {
  try {
    const models = await CarModel.find({ makeId }).sort({ name: 1 })
    return { success: true, data: models }
  } catch (error) {
    return meta500 as ServiceResponse<IModel[]>
  }
}

export const getYearsByModel = async (modelId: string): Promise<ServiceResponse<IYear[]>> => {
  try {
    const years = await YearModel.find({ modelId }).sort({ value: -1 })
    return { success: true, data: years }
  } catch (error) {
    return meta500 as ServiceResponse<IYear[]>
  }
}
