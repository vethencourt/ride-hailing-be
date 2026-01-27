import { Router } from 'express'
import type { Request, Response } from 'express'
import authRoutes from './auth.router.js'
import vehicleRoutes from './vehicles.router.js'
import metaRoutes from './meta.router.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/meta', metaRoutes)
router.use('/vehicles', authenticate, vehicleRoutes)

// TODO: delete this
router.get('/hello', (_: Request, res: Response) => {
  res.status(200).json({ status: 'Yes.' })
})

export default router
