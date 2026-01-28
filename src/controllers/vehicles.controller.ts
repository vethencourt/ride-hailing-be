import type { Request, Response } from 'express'
import type { IVehicleListRequest } from '../types/vehicles.types.js'
import * as vehiclesService from '../services/vehicles.service.js'

export async function getVehicles(request: Request, response: Response) {
  const listRequest = request.body as IVehicleListRequest
  const result = await vehiclesService.getAllVehicles(listRequest)

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(200).json(result.data)
}

export async function getVehicle(request: Request, response: Response) {
  const { id } = request.params
  const result = await vehiclesService.getVehicleById(id as string)

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(200).json(result.data)
}

export async function createVehicle(request: Request, response: Response) {
  const userId = request.user?.id
  const result = await vehiclesService.createVehicle(request.body, userId as string)

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(201).json(result.data)
}

export async function updateVehicle(request: Request, response: Response) {
  const { id } = request.params
  const userId = request.user?.id
  const result = await vehiclesService.updateVehicle(id as string, userId, request.body)

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(200).json(result.data)
}

export async function deleteVehicle(request: Request, response: Response) {
  const { id } = request.params
  const result = await vehiclesService.deleteVehicle(id as string)

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(200).json(result.data)
}
