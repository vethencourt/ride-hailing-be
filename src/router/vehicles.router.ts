import { Router } from 'express'
import {
  createVehicle,
  deleteVehicle,
  getVehicle,
  getVehicles,
  updateVehicle
} from '../controllers/vehicles.controller.js'

const router: Router = Router()

router.post('/', getVehicles)
router.get('/:id', getVehicle)
router.post('/create', createVehicle)
router.put('/:id/', updateVehicle)
router.delete('/:id', deleteVehicle)

export default router
