import { Router } from 'express'
import authRoutes from './auth.router.js'
import vehicleRoutes from './vehicles.router.js'
import metaRoutes from './meta.router.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { runSeeder } from '../seed/index.js'

const router: Router = Router()

// health check
router.get('/', (_, response) => response.send('API is running...'))

// run seed script
router.get('/seed-database', async (_, res) => {
  try {
    await runSeeder()
    res.status(200).send('Base de datos sembrada correctamente')
  } catch (err) {
    res.status(500).send('Error al sembrar la base de datos')
  }
})

router.use('/auth', authRoutes)
router.use('/meta', metaRoutes)
router.use('/vehicles', authenticate, vehicleRoutes)

export default router
