import type { Request, Response } from 'express'
import * as metaService from '../services/meta.service.js'

export async function getMakes(_: Request, response: Response) {
  const result = await metaService.getMakes()

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(200).json(result.data)
}

export async function getModels(request: Request, response: Response) {
  const { makeId } = request.params
  const result = await metaService.getModelsByMake(makeId as string)

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(200).json(result.data)
}

export async function getYears(request: Request, response: Response) {
  const { modelId } = request.params
  const result = await metaService.getYearsByModel(modelId as string)

  if (!result.success) {
    return response.status(result.code).json({ error: result.error })
  }

  return response.status(200).json(result.data)
}
