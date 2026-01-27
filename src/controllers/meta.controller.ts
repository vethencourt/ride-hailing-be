import type { Request, Response } from 'express'

export async function getMakes(request: Request, response: Response) {
  console.log(request)
  response.send('Car makes')
}

export async function getModels(request: Request, response: Response) {
  const { makeId } = request.params
  console.log(makeId)
  response.send('Car models')
}

export async function getYears(request: Request, response: Response) {
  const { modelId } = request.params
  console.log(modelId)
  response.send('Car years')
}
