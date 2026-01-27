import { Router } from 'express'
import {
  createVehicle,
  deleteVehicle,
  getVehicle,
  getVehicles,
  updateVehicle
} from '../controllers/vehicles.controller.js'

const router: Router = Router()

router.get('/', getVehicles)
router.get('/:id', getVehicle)
router.post('/:userId', createVehicle)
router.put('/:vehicleId/:userId', updateVehicle)
router.delete('/:id', deleteVehicle)

export default router
