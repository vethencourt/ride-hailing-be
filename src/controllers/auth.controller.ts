import type { Request, Response } from 'express'

export async function login(request: Request, response: Response) {
  console.log(request)
  response.status(200).json({ message: 'login' })
}

export async function signup(request: Request, response: Response) {
  console.log(request)
  response.status(200).json({ message: 'signup' })
}
