import { Router } from 'express'
import { getMakes, getModels, getYears } from '../controllers/meta.controller.js'

const router: Router = Router()

router.get('/makes', getMakes)
router.get('/models/:makeId', getModels)
router.get('/years/:modelId', getYears)

export default router
