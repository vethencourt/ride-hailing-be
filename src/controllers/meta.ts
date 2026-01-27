import type { Request, Response } from 'express'

export const getMakes = async (request: Request, response: Response) => {
  console.log(request)
  response.send('Car makes')
}

export const getModels = async (request: Request, response: Response) => {
  const { makeId } = request.params
  console.log(makeId)
  response.send('Car models')
}

export const getYears = async (request: Request, response: Response) => {
  const { modelId } = request.params
  console.log(modelId)
  response.send('Car years')
}
