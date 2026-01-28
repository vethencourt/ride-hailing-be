import { Vehicle } from '../models/vehicle.model.js'
import type {
  IVehicle,
  ICreateVehicle,
  IVehicleListRequest,
  IVehicleListResponse
} from '../types/vehicles.types.js'
import type { ServiceResponse } from '../types/types.js'
import { vehicle404, vehicle500, vehicleList500 } from '../utils/errors.js'

export const getAllVehicles = async (
  listRequest?: IVehicleListRequest
): Promise<ServiceResponse<IVehicleListResponse>> => {
  try {
    const pagination = listRequest?.pagination ?? { current: 1, size: 10, total: 0 }
    const searchTerm = listRequest?.searchTerm?.trim()
    const sortBy = listRequest?.sortBy
    const sortOrder = listRequest?.sortOrder ? Number(listRequest!.sortOrder) : -1

    const filter: any = {}

    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i')
      const or: any[] = [{ make: regex }, { model: regex }]

      const num = Number(searchTerm)
      if (!Number.isNaN(num)) or.push({ year: num })

      filter.$or = or
    }

    const total = await Vehicle.countDocuments(filter)
    const page = pagination.current && pagination.current > 0 ? pagination.current : 1
    const size = pagination.size && pagination.size > 0 ? pagination.size : 10

    const query = Vehicle.find(filter)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')

    const sortObj: any = {}
    if (sortBy) sortObj[String(sortBy)] = sortOrder
    else sortObj.createdAt = -1

    const vehicles = await query
      .sort(sortObj)
      .skip((page - 1) * size)
      .limit(size)

    const data: IVehicleListResponse = {
      vehicles,
      pagination: { current: page, total, size }
    }

    return { success: true, data }
  } catch (error) {
    return vehicleList500
  }
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
