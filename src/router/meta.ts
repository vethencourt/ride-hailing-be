import { Router } from 'express'
import { getMakes, getModels, getYears } from '../controllers/meta.js'

const router: Router = Router()

router.get('/makes', getMakes)
router.get('/model:makeId', getModels)
router.get('/year:modelId', getYears)

export default router
