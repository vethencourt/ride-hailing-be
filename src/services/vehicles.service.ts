import { Vehicle } from '../models/vehicle.model.js'
import type { IVehicle, ICreateVehicle } from '../types/vehicles.types.js'
import type { ServiceResponse } from '../types/types.js'
import { vehicle404, vehicle500 } from '../utils/errors.js'

export const getAllVehicles = async (): Promise<ServiceResponse<IVehicle[]>> => {
  const vehicles = await Vehicle.find()
    .populate('createdBy', 'email')
    .populate('updatedBy', 'email')

  return { success: true, data: vehicles }
}

export const getVehicleById = async (id: string): Promise<ServiceResponse<IVehicle>> => {
  try {
    const vehicle = await Vehicle.findById(id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')

    if (!vehicle) return vehicle404

    return { success: true, data: vehicle }
  } catch (error) {
    return { success: false, error: 'Formato de ID inválido', code: 400 }
  }
}

export const createVehicle = async (
  data: ICreateVehicle,
  userId: string
): Promise<ServiceResponse<IVehicle>> => {
  try {
    const newVehicle = new Vehicle({
      ...data,
      createdBy: userId,
      updatedBy: userId
    })

    const savedVehicle = await newVehicle.save()
    return { success: true, data: savedVehicle }
  } catch (error) {
    return vehicle500('crear')
  }
}

export const updateVehicle = async (
  id: string,
  userId: string,
  data: Partial<IVehicle>
): Promise<ServiceResponse<IVehicle>> => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { ...data, updatedBy: userId },
      { new: true }
    ).populate('createdBy updatedBy', 'email')

    if (!updatedVehicle) return vehicle404

    return { success: true, data: updatedVehicle }
  } catch (error) {
    return vehicle500('actualizar')
  }
}

export const deleteVehicle = async (id: string): Promise<ServiceResponse<{}>> => {
  const result = await Vehicle.findByIdAndDelete(id)
  if (!result) return vehicle404

  return { success: true, data: {} }
}
