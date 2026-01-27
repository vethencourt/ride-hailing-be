import { Router } from 'express'
import {
  createVehicle,
  deleteVehicle,
  getVehicle,
  getVehicles,
  updateVehicle
} from '../controllers/vehicles.js'

const router: Router = Router()

router.get('/', getVehicles)
router.get('/:id', getVehicle)
router.post('/', createVehicle)
router.put('/:id', updateVehicle)
router.delete('/:id', deleteVehicle)

export default router
