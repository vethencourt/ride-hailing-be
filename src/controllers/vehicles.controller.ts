import type { Request, Response } from 'express'

export const getVehicles = async (request: Request, response: Response) => {
  console.log(request)
  response.send('Vehicles list')
}

export const getVehicle = async (request: Request, response: Response) => {
  const { id } = request.params
  console.log(id)
  response.send('Vehicle details')
}

export const createVehicle = async (request: Request, response: Response) => {
  console.log(request)
  response.send('Vehicle creation')
}

export const updateVehicle = async (request: Request, response: Response) => {
  const { id } = request.params
  console.log(id)
  response.send('Vehicle update')
}

export const deleteVehicle = async (request: Request, response: Response) => {
  const { id } = request.params
  console.log(id)
  response.send('Vehicle deletion')
}
