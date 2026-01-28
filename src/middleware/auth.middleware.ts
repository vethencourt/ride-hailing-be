import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export async function authenticate(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization
  const token = authHeader?.split(' ')[1]
  const secret = process.env['JWT_SECRET']

  if (!token) return response.status(401).json({ message: 'Unauthorized' })

  try {
    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, secret as string, (err: any, user: any) => {
        if (err) reject(err)
        else resolve(user)
      })
    })

    request.user = user
    return next()
  } catch (_) {
    return response.status(403).json({ message: 'Forbidden' })
  }
}
