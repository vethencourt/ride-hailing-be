import { Router } from 'express'
import {
  createVehicle,
  deleteVehicle,
  getVehicle,
  getVehicles,
  updateVehicle
} from '../controllers/vehicles.controller.js'
import { validateBody, vehicleCreateSchema, vehicleUpdateSchema } from '../utils/validation.js'

const router: Router = Router()

router.post('/', getVehicles)
router.get('/:id', getVehicle)
router.post('/create', validateBody(vehicleCreateSchema), createVehicle)
router.put('/:id/', validateBody(vehicleUpdateSchema), updateVehicle)
router.delete('/:id', deleteVehicle)

export default router
