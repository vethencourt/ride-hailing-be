import type { Request, Response } from 'express'

export async function getVehicles(request: Request, response: Response) {
  console.log(request)
  response.send('Vehicles list')
}

export async function getVehicle(request: Request, response: Response) {
  const { id } = request.params
  console.log(id)
  response.send('Vehicle details')
}

export async function createVehicle(request: Request, response: Response) {
  console.log(request)
  response.send('Vehicle creation')
}

export async function updateVehicle(request: Request, response: Response) {
  const { id } = request.params
  console.log(id)
  response.send('Vehicle update')
}

export async function deleteVehicle(request: Request, response: Response) {
  const { id } = request.params
  console.log(id)
  response.send('Vehicle deletion')
}
