import type { Request, Response } from 'express'

export const login = async (request: Request, response: Response) => {
  console.log(request)
  response.status(200).json({ message: 'login' })
}

export const signup = async (request: Request, response: Response) => {
  console.log(request)
  response.status(200).json({ message: 'signup' })
}
