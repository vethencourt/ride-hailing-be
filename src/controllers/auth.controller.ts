import type { Request, Response } from 'express'
import * as authService from '../services/auth.service.js'

export const signup = async (req: Request, res: Response) => {
  const result = await authService.signup(req.body)

  if (!result.success) {
    return res.status(result.code).json({ error: result.error })
  }

  return res.status(201).json({ message: 'Usuario creado exitosamente' })
}

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body)

  if (!result.success) {
    return res.status(result.code).json({ error: result.error })
  }

  return res.status(200).json(result.data)
}
