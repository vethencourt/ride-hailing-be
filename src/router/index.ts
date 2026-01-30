import { Router } from 'express'
import authRoutes from './auth.router.js'
import vehicleRoutes from './vehicles.router.js'
import metaRoutes from './meta.router.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router: Router = Router()

router.get('/', (_, response) => response.send('API is running...')) // health check
router.use('/auth', authRoutes)
router.use('/meta', metaRoutes)
router.use('/vehicles', authenticate, vehicleRoutes)

export default router
