import { Router } from 'express'
import type { Request, Response } from 'express'
import authRoutes from './auth.js'
import vehicleRoutes from './vehicles.js'
import metaRoutes from './meta.js'

const router: Router = Router()

router.use('/auth', authRoutes)
router.use('/vehicles', vehicleRoutes)
router.use('/meta', metaRoutes)

// TODO: delete this
router.get('/hello', (_: Request, res: Response) => {
  res.status(200).json({ status: 'Yes.' })
})

export default router
